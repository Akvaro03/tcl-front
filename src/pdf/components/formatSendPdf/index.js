import Style from "./formatSendPdf.module.css"

function FormatSendPdf() {
    return (
        <div className={Style.formatSend}>
            <p>Formato de entrega autorizada por el cliente:</p>
            <h1>Envio por correo electronico y/o fisico</h1>
        </div>
    );
}

export default FormatSendPdf;