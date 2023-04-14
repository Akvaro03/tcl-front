import { useEffect, useState } from "react";
import CardOt from "./components/cardOt";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import Style from "./listCards.module.css"
function ListCards() {
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

export default ListCards;