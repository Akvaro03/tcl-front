import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import ModalPortal from "../../../../components/modelPortal";
import getUser from "../../../../components/getUser";
import Alerts from '../../../../components/alerts';
import postData from "../../../../hooks/postData";
import { useEffect, useState } from "react";
import Style from "./listCards.module.css"
import CardOt from "./components/cardOt";
import FormCommit from "../formCommit";

function ListCards() {
    const [User, setUser] = useState()
    const [DataToSend, setDataToSend] = useState()
    const [Ots, setOts] = useState()
    const [Result, setResult] = useState()
    let handleState = async (index, string, comment, type) => {
        let OtsFound = Ots.findIndex(element => element.id === index)
        await handleChangeStateOt(Ots[OtsFound], type, string, User, setUser, comment, setDataToSend)
    }
    useEffect(() => {
        const getData = async () => {
            let user = JSON.parse(JSON.parse(getUser()).userString);
            let userLogin = await postData('http://localhost:4000/getOneUser', { name: user.name }).then(res => res[0])
            setUser(userLogin)
            getDataFromUrl('http://localhost:4000/getOT')
                .then(json => {
                    json = filterByName(json, user.name);
                    setOts(json.length > 0 ? json : undefined)
                })
        }
        getData()
    }, [DataToSend])

    return (
        <>
            {Ots ? (
                <div className={Style.GridCards}>
                    {Ots.map((Ot, key) => {
                        return <CardOt key={key} Ot={Ot} handleState={handleState} />
                    })}
                    {DataToSend && (
                        <ModalPortal type={"form"}>
                            <FormCommit
                                DataHistory={DataToSend.History}
                                DataScore={DataToSend.Score}
                                DataState={DataToSend.State}
                                setUser={setUser}
                                setResult={setResult}
                                setDataToSend={setDataToSend} />
                        </ModalPortal>
                    )}
                </div>
            ) : (
                <div className={Style.NoGrids}>
                    No hay Ots asignadas
                </div>
            )}
            {Result && (
                <ModalPortal type={"alert"}>
                    <Alerts Result={Result} />
                </ModalPortal>
            )}
        </>
    );
}
let typeOt = {
    Reducido: 0.5,
    'Verif. Identidad': 0.7,
    Ampliado: 1.3,
    'Ensayo Eficiencia': 1,
    'Ensayo Completo': 1.5,
    "Otra actividad": 0.5

}
const filterByName = (json, name) => {
    let jsonFiltered = json.filter(ot => {
        if (ot.Users !== null) {
            let users = JSON.parse(ot.Users).data;
            let found = users.find(e => e === name)
            if (found === name) {
                return true
            }
        }
        return false
    })
    return jsonFiltered;
}
const handleChangeStateOt = async (ot, type, state, userLogin, setUser, comment, setDataToSend) => {

    if (type) {
        let prevScore = userLogin.score
        userLogin.score = prevScore + typeOt[type];
    }
    let Changes = {
        userId: userLogin.id,
        userName: userLogin.name,
        ChangeDescription: `Se cambio el estado a ${state}`,
        date: new Date(Date.now()).getTime(),
        comment
    }
    setDataToSend({ History: { idOt: ot.id, Changes }, State: { state, idOt: ot.id }, Score: userLogin })
}
export default ListCards;