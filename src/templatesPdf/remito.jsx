import Style from "./remito.module.css"
import React from "react";
const Remito = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <div className={Style.header}>
                <h1>Título del Documento</h1>
                <p>Fecha: 15 de Mayo, 2023</p>
            </div>

            <div className={Style.section}>
                <h2>Sección 1</h2>
                <p>Este es el contenido de la sección 1.</p>
                <ul>
                    <li>Elemento 1</li>
                    <li>Elemento 2</li>
                    <li>Elemento 3</li>
                </ul>
            </div>

            <div className={Style.section}>
                <h2>Sección 2</h2>
                <p>Este es el contenido de la sección 2.</p>
                <ol>
                    <li>Elemento A</li>
                    <li>Elemento B</li>
                    <li>Elemento C</li>
                </ol>
            </div>

            <div className={Style.footer}>
                <p>Pie de página del documento.</p>
            </div>
        </div>
    );
})

export default Remito;