import { useState } from "react";
import toUppercase from "../toUppercase";

function useAddItems(prevItems) {
    const [items, setItems] = useState(prevItems ? prevItems : defaultItems)

    const handleDescription = (value, number, type) => {
        let copy = [...items]
        copy[number][type] = type === "Description" && value ? toUppercase(value) : value;
        setItems(copy)
    }
    const deleteItems = (key) => {
        let copy = [...items]
        copy = copy.splice(key - 1, 1)
        setItems(copy)
    }
    const addItems = () => {
        setItems(prev => [...prev, defaultItems])
    }

    return { items, handleDescription, deleteItems, addItems }
}
const defaultItems = [{ item: "", Description: "", import: 0 }]
export default useAddItems;