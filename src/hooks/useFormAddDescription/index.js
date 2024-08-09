import { useState } from "react";

function useFormAddDescription(description, saveDescription) {
    const [newDescription, setNewDescription] = useState(description ? [...description] : []);
    const handleDescription = (data, number, type) => {
        // Crea una copia del array actual
        const updatedDescription = [...newDescription];

        // Modifica la propiedad `type` del objeto en la posición `number`
        updatedDescription[number] = {
            ...updatedDescription[number],
            [type]: data,
        };

        // Actualiza el estado con el array modificado
        setNewDescription(updatedDescription);
    };

    const save = () => {
        saveDescription(newDescription)
    }

    const addDescription = () => {
        setNewDescription(prev => [...prev, initialValue])
    }

    return { newDescription, handleDescription, addDescription, save }
}

const initialValue = {
    Description: "",
    import: "0",
    item: ""
}

export default useFormAddDescription;