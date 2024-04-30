import Style from "./productDataPdf.module.css"

function ProductDataPdF({ ot }) {
    return (
        <div className={Style.productData}>
            <div className={Style.productDiv}>
                <p>Producto:</p>
                {<h1>{ot.Producto}</h1>}
            </div>
            <div className={Style.productDiv}>
                <p>Marca:</p>
                {<h1>{ot.Marca}</h1>}
            </div>
            <div className={Style.productDiv}>
                <p>Modelo:</p>
                {<h1>{ot.Modelo}</h1>}
            </div>
        </div>
    );
}

export default ProductDataPdF;