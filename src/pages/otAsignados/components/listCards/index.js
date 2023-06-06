import ModalPortal from "../../../../components/modelPortal";
import Alerts from '../../../../components/alerts';
import { useState } from "react";
import Style from "./listCards.module.css"
import FormCommit from "../formCommit";
import CardOt from "./components/cardOt";

function ListCards({ User, Ots, setUser }) {
    const [DataToSend, setDataToSend] = useState()
    const [Result, setResult] = useState()
    let handleState = async (index, string, comment, type) => {
        let OtsFound = Ots.findIndex(element => element.id === index)
        await handleChangeStateOt(Ots[OtsFound], type, string, User, setUser, comment, setDataToSend)
    }

    return (
        <>
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