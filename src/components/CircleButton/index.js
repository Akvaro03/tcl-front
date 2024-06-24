import Style from "./CircleButton.module.css"

function CircleButton({ tittle, onClick, background = "white" }) {
    return (
        <p
            style={{ background: background }}
            onClick={onClick}
            className={Style.CircleButton}>
            {tittle}
        </p>
    );
}

export default CircleButton;