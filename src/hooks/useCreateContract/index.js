import { useState } from "react"

function useCreateContract(contractToEdit) {
    const [contract, setContract] = useState(contractToEdit ? contractToEdit : contractDefault)
    const getContractFormatted = () => {
        return contract
    }
    const saveContract = () => {
        console.log(getContractFormatted)
    }

    const handleChangeContract = (value, type) => {
        setContract(prev => { return { ...prev, [type]: value } })
    }

    return { contract, handleChangeContract, saveContract }
}

const contractDefault = {
    name: "",
    nickname: "",
    file: null
}

export default useCreateContract;