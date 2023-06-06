import Style from "./Data.module.css"

function DataOt() {
    return (
        <div className={Style.contentData}>
            <div className={Style.tittlesCategories}>
                <div className={Style.contentTittle}>
                    <h1>OT Seleccionada</h1>
                </div>
                <div className={Style.contentTittle}>
                    <h1>Id de OT</h1>
                </div>
                <div className={Style.contentTittle}>
                    <h1>Tipo de OT</h1>
                </div>
            </div>
            <div className={Style.dataCategories}>
                <div className={Style.contentTittle}>
                </div>
                <div className={Style.contentTittle}>
                    <h1>1</h1>
                </div>
                <div className={Style.contentTittle}>
                    <h1>Reducido</h1>
                </div>
            </div>
        </div>
    );
}

export default DataOt;