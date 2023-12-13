import { useEffect, useState } from "react";
import Style from "./Etiqueta.module.css"
import { useParams } from "react-router-dom";
import postData from "../../db/postData";

function Etiquetas() {
    const [OT, setOT] = useState()
    let { count, id } = useParams();
    const steps = count ? count : 2;
    useEffect(() => {
        const getOt = async () => {
            const ot = await postData("http://localhost:4000/getOneOt", { id }).then(response => response[0])
            console.log(ot)
            const cards = Array.from({ length: steps }, (_, index) => (
                <Label OT={ot} key={index} />
            ))
            setOT(cards)
        }
        getOt()
    }, [id, steps])
    return (
        <div className={Style.container}>
            {OT}
        </div>
    );
}

const Label = ({ OT }) => {
    const name = OT.OTKey.split(" ")
    return (
        <div className={Style.card}>
            <div className={Style.header}>
                <h1>{`${name[0]} ${name[1]}`}</h1>
                <h1>{name[2]}</h1>
                <p>{OT.Producto}</p>
            </div>
            <div className={Style.dataContent}>
                <div className={Style.data}>
                    <p className={Style.field}>Marca:</p>
                    <p className={Style.value}>{OT.Marca ? OT.Marca : "-"}</p>
                </div>
                <div className={Style.data}>
                    <p className={Style.field}>Modelo:</p>
                    <p className={Style.value}>{OT.Modelo ? OT.Modelo : "-"}</p>
                </div>
                <div className={Style.data}>
                    <p className={Style.field}>Actividad:</p>
                    <p className={Style.value}>{OT.Type ? OT.Type : "-"}</p>
                </div>
                <div className={Style.data}>
                    <p className={Style.field}>Norma:</p>
                    <p className={Style.value}>{OT.NormaAplicar ? OT.NormaAplicar : "-"}</p>
                </div>
            </div>
        </div>
    )
}

export default Etiquetas;