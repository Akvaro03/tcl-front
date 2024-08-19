import { useState } from "react"
import postFiles from "../../db/postFiles"
import nameUsed from "../../db/nameUsed"
import deleteContractDb from "../../db/deleteContractDb"

function useCreateContract(contractToEdit, close, createAlert) {
    const [contract, setContract] = useState(contractToEdit.name ? contractToEdit : contractDefault)

    const handleChangeContract = (value, type) => {
        setContract(prev => { return { ...prev, [type]: value } })
    }

    const getContractFormatted = () => {
        const newForm = new FormData()
        newForm.append("name", contract.name)
        newForm.append("id", contract.id)
        newForm.append("contractFile", contract.contractFile ? contract.contractFile : "null")
        return newForm
    }

    const isContractValid = () => contract.name.length > 0 && contract.contractFile !== null

    const saveContract = async () => {
        if (await isNameUsed()) {
            createAlert("name used")
            return
        }
        if (!isContractValid()) {
            createAlert("missed data")
            return
        }
        let response;
        if (contractToEdit) {
            response = await postFiles(getContractFormatted(), "/editContract")
        } else {
            response = await postFiles(getContractFormatted(), "/postContract")
        }
        createAlert(response)
        close()
    }
    const deleteContract = () => {
        deleteContractDb({ id: contract.id, url: contract.url })
            .then(res => createAlert(res))
            .then(close())

    }

    const isNameUsed = async () => contractToEdit ? contractToEdit.name.toLowerCase() !== contract.name.toLowerCase() ? await nameUsed(contract.name, "contract") : false : await nameUsed(contract.name, "contract")

    return { contract, handleChangeContract, saveContract, isContractValid, deleteContract }
}

const contractDefault = {
    name: "",
    contractFile: null,
    contractData: ""
}

export default useCreateContract;