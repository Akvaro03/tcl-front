import { useEffect, useState } from "react";
import CardOt from "./components/cardOt";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import Style from "./listCards.module.css"
import { useSelector } from "react-redux";
function ListCards() {
    const nameUserLogin = useSelector(userLogin => userLogin.userLogin.name);
    const [Ots, setOts] = useState()
    let handleState = (index, string) => {
        let newOts = [];
        Ots.forEach(element => {
            if (element.id === index) {
                element.StateProcess = string
            }
            newOts.push(element)
        });
        setOts(newOts)
    }
    useEffect(() => {
        const getData = async () => {
            getDataFromUrl('http://localhost:4000/getOT')
                .then(json => {
                    json = filterByName(json, nameUserLogin);
                    setOts(json)
                })
        }
        getData()
    }, [nameUserLogin])

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
export default ListCards;