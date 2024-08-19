import editDb from "../../classes/editDb";

export default function deleteContractDb(data) {
    return editDb.postData("deleteContract", data)
} 