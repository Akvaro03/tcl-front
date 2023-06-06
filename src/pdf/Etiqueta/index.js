import Style from "./Etiqueta.module.css"
import { useParams } from "react-router-dom";

function Etiquetas() {
    let { count } = useParams();
    const steps = count ? count : 2;
    const cards = Array.from({ length: steps }, (_, index) => (
        <Label key={index} /> 
    ))
    return (
        <div className={Style.container}>
            {cards}
        </div>
    );
}

const Label = () => {
    return (
        <div className={Style.card}>
            <div className={Style.header}>
                <h1>1707179 S</h1>
                <h1>DAVI</h1>
                <p>VENTILADOR AXIAL</p>
            </div>
            <div className={Style.dataContent}>
                <div className={Style.data}>
                    <p className={Style.field}>Marca:</p>
                    <p className={Style.value}>WEI GUANG</p>
                </div>
                <div className={Style.data}>
                    <p className={Style.field}>Marca:</p>
                    <p className={Style.value}>WEI GUANG</p>
                </div>
                <div className={Style.data}>
                    <p className={Style.field}>Marca:</p>
                    <p className={Style.value}>WEI GUANG</p>
                </div>
                <div className={Style.data}>
                    <p className={Style.field}>Marca:</p>
                    <p className={Style.value}>WEI GUANG</p>
                </div>
            </div>
        </div>
    )
}

export default Etiquetas;