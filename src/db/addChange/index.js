import postData from "../../hooks/postData";

function addChange(newChange, idOt) {
    postData('http://localhost:4000/editOtChanges', { Changes: newChange, idOt })
}

export default addChange;