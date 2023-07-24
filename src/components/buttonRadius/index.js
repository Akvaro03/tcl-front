import Style from "./buttonRadius.module.css"
import AddIcon from '@mui/icons-material/Add';
function ButtonRadius({ onClick, text, type }) {
    return (
        type === "success" ? (
            <div className={Style.availability} onClick={onClick}>
                <h1>
                    {text}
                </h1>
            </div>
        ) : type === "error" ? (
            <div className={Style.availabilityError} onClick={onClick}>
                <h1>
                    {text}
                </h1>
            </div>
        ) : (
            <div className={Style.availabilitySelect} onClick={onClick}>
                <h1>
                    <AddIcon />
                    {text}
                </h1>
            </div>
        )
    );
}

export default ButtonRadius;