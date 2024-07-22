import { useState } from "react"
import postFiles from "../../db/postFiles"

function useCreateContract(contractToEdit) {
    const [contract, setContract] = useState(contractToEdit ? contractToEdit : contractDefault)
    const handleChangeContract = (value, type) => {
        setContract(prev => { return { ...prev, [type]: value } })
    }

    const getContractFormatted = () => {
        const newForm = new FormData()
        newForm.append("name", contract.name)
        newForm.append("contractFile", contract.contractFile)
        return newForm
    }

    const saveContract = () => {
        postFiles(getContractFormatted(),"/postContract")
    }

    return { contract, handleChangeContract, saveContract }
}

const contractDefault = {
    name: "",
    contractFile: null
}

export default useCreateContract;