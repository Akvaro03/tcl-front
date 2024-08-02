import { useState } from "react"
import postFiles from "../../db/postFiles"

function useCreateContract(contractToEdit, close) {
    const [contract, setContract] = useState(contractToEdit.name ? contractToEdit : contractDefault)

    const handleChangeContract = (value, type) => {
        setContract(prev => { return { ...prev, [type]: value } })
    }

    const getContractFormatted = () => {
        const newForm = new FormData()
        newForm.append("name", contract.name)
        newForm.append("contractFile", contract.contractFile)
        return newForm
    }

    const isContractValid = () => {
        return contract.name.length > 0 && contract.contractFile !== null
    }
    const saveContract = () => {
        if (!isContractValid()) return
        postFiles(getContractFormatted(), "/postContract")
        close()
    }

    return { contract, handleChangeContract, saveContract, isContractValid }
}

const contractDefault = {
    name: "",
    contractFile: null,
    contractData: ""
}

export default useCreateContract;