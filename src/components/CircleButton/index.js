import Style from "./CircleButton.module.css"

function CircleButton({ tittle, onClick }) {
    return (
        <p
            onClick={onClick}
            className={Style.CircleButton}>
            {tittle}
        </p>
    );
}

export default CircleButton;