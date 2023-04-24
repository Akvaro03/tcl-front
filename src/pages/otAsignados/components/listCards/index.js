import { useEffect, useState } from "react";
import CardOt from "./components/cardOt";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import Style from "./listCards.module.css"
import getUser from "../../../../components/getUser";
import postData from "../../../../hooks/postData";
function ListCards() {
    const [User, setUser] = useState()

    const [Ots, setOts] = useState()
    let handleState = async (index, string, comment, type) => {
        let newOts = [...Ots];
        let OtsFound = Ots.findIndex(element => element.id === index)
        await handleChangeStateOt(Ots[OtsFound], type, string, User, setUser, comment)
        setOts(newOts)
    }
    useEffect(() => {
        const getData = async () => {
            let user = JSON.parse(JSON.parse(getUser()).userString);
            let userLogin = await postData('http://localhost:4000/getOneUser', { name: user.name }).then(res => res[0])
            setUser(userLogin)
            getDataFromUrl('http://localhost:4000/getOT')
                .then(json => {
                    json = filterByName(json, user.name);
                    setOts(json)
                })
        }
        getData()
    }, [])

    return (
        <div className={Style.GridCards}>
            {Ots && (
                Ots.map((Ot, key) => {
                    return <CardOt key={key} Ot={Ot} handleState={handleState} />
                })
            )}
        </div>
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
const handleChangeStateOt = async (ot, type, state, userLogin, setUser, comment) => {

    if (type) {
        let prevScore = userLogin.score
        userLogin.score = prevScore + typeOt[type];
        postData('http://localhost:4000/editScoreUser', userLogin)
    }
    postData('http://localhost:4000/editOtState', { state, idOt: ot.id })
    let Changes = {
        user: userLogin.id,
        stateChange: true,
        newState: state,
        date: Date.now(),
        comment
    }
    postData('http://localhost:4000/postHistory', { idOt: ot.id, Changes })
    ot.StateProcess = state
    setUser(userLogin)
    return ot;
}
export default ListCards;