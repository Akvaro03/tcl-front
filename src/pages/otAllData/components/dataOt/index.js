import { Button } from "@mui/material";
import Style from "./Data.module.css"
import formatDateM from "../../../../hooks/formatDateM";

function DataOt({ otSelected }) {
    const activities = JSON.parse(otSelected.Activities)
    return (
        <div className={Style.contentData}>
            <div className={Style.tittlesCategories}>
                <div className={Style.contentTittle}>
                    <h1 className={Style.tittlePage}>OT Seleccionada</h1>
                </div>
                <div className={Style.contentTittle}>
                    <h1>Id de OT</h1>
                </div>
                <div className={Style.contentTittle}>
                    <h1>Tipo de OT</h1>
                </div>
                <div className={Style.contentTittle}>
                    <h1>Fecha</h1>
                </div>
                <div className={Style.contentActivities}>
                    <h1>Actividades</h1>
                </div>
                <div className={Style.addButton}>
                    <Button size="small" variant="outlined" sx={{ visibility: "hidden", paddingBottom: "10px" }}>Add activity</Button>
                </div>
                <div className={Style.contentTittle}>
                    <h1>Autorización</h1>
                </div>
                <div className={Style.ProductTittle}>
                    Producto
                </div>
                <div className={Style.ProductSection}>
                    <h1>Nombre</h1>
                </div>
                <div className={Style.ProductSection}>
                    <h1>Marca</h1>
                </div>
                <div className={Style.ProductSection}>
                    <h1>Modelo</h1>
                </div>
                <div className={Style.ProductSection}>
                    <h1>DFR</h1>
                </div>
                <div className={Style.ProductSection}>
                    <h1>Retiro</h1>
                </div>
                <div className={Style.ProductSection}>
                    <h1>Entrega</h1>
                </div>
                <div className={Style.ProductTittle}>
                    Cliente
                </div>
                <div className={Style.ProductSection}>
                    <h1>Nombre</h1>
                </div>
                <div className={Style.ProductSection}>
                    <h1>N° Cliente</h1>
                </div>
                <div className={Style.ProductSection}>
                    <h1>Contacto</h1>
                </div>
            </div>
            <div className={Style.dataCategories}>
                <div className={Style.contentTittle}>
                </div>
                <div className={Style.contentTittle}>
                    <h1>{otSelected.id}</h1>
                </div>
                <div className={Style.contentTittle}>
                    <h1>{otSelected.Type}</h1>
                </div>
                <div className={Style.contentTittle}>
                    <h1>{formatDateM(otSelected.Date)}</h1>
                </div>
                <div className={Style.Activities}>
                    {activities && (
                        activities.map((activity, key) => (
                            <div key={key} className={Style.activityProcess}>
                                <h1>{activity}</h1>
                            </div>
                        ))
                    )}
                </div>
                <div className={Style.addButton}>
                    <Button size="small" variant="outlined">Añadir actividad</Button>
                </div>
                <div className={Style.authNone}>
                    <h1>No autorizado</h1>
                </div>
                <div className={Style.ProductTittle}>
                </div>
                <div className={Style.ProductContent}>
                    <h1>{otSelected.Producto}</h1>
                </div>
                <div className={Style.ProductContent}>
                    <h1>{otSelected.Marca}</h1>
                </div>
                <div className={Style.ProductContent}>
                    <h1>{otSelected.Modelo}</h1>
                </div>
                <div className={Style.ProductContent}>
                    <h1>14/15/2003</h1>
                </div>
                <div className={Style.ProductContent}>
                    <h1>14/15/2003</h1>
                </div>
                <div className={Style.ProductContent}>
                    <h1>14/15/2003</h1>
                </div>
                <div className={Style.ProductTittle}>
                </div>
                <div className={Style.ProductContent}>
                    <h1>{otSelected.Client}</h1>
                </div>
                <div className={Style.ProductContent}>
                    <h1>26551</h1>
                </div>
                <div className={Style.ProductContent}>
                    <h1>34122151</h1>
                </div>

            </div>
        </div>
    );
}

export default DataOt;