import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import getOneOt from "../../db/getOneOt";
import ClassPriorityOt from "../../classes/priorityOt";
import classToastList from "../../classes/classToastList";
import editOt from "../../db/editOT";
import messageHistory from "../messageHistory";
import permissions from "../../classes/permissions";
import getUser from "../getUser";

function useOtData() {
    let { id } = useParams();
    const [ot, setOt] = useState(initialValue)
    const [changes, setChanges] = useState()
    const [reset, setReset] = useState(false)
    const [valuesChanged, SetValuesChanged] = useState([])
    const [messageList, setMessageList] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [isPrint, setIsPrint] = useState(false)
    const rol = getUser("roles");
    useEffect(() => {
        if (valuesChanged.some(value => ['Auth', "Description", "Factura", "Availability", 'priority', "Contact", "Activities"].includes(value))) {
            save()
        }
    }, [ot, valuesChanged])

    useEffect(() => {
        id && getOneOt({ id })
            .then(data => formatOt(data[0]))
            .then(data => {
                setOt(data)
                setChanges(data.Changes)
                console.log(data)
            })
    }, [id, reset])
    const formatOt = (ot) => {
        return {
            ...ot,
            Activities: formatString(ot.Activities),
            Changes: formatString(ot.Changes),
            Contact: formatString(ot.Contact),
            Description: formatString(ot.Description),
            contractName: formatString(ot.contractName),
            Factura: formatString(ot.Factura),
            Availability: formatString(ot.Availability)
        }
    }
    const resetOt = () => {
        setTimeout(() => {
            setReset(prev => !prev)
        }, 500);
    }
    const handleChangeOt = (type, value) => {
        setOt(prev => ({ ...prev, [type]: value }))
        SetValuesChanged(prev => {
            if (!prev.includes(type)) {
                return [...prev, type];
            }
            return prev;
        });
    }
    const getOt = () => {
        return {
            ...ot,
            Activities: formatToString(ot.Activities),
            Changes: formatToString(ot.Changes),
            contractName: formatToString(ot.contractName),
            Contact: formatToString(ot.Contact),
            Description: formatToString(ot.Description),
            Factura: formatToString(ot.Factura),
            Availability: formatToString(ot.Availability),
        }
    }
    const save = () => {
        editOt(getOt(), id, messageHistory.tittleEditOT, (`Se han modificado los siguientes campos: ${valuesChanged.join(", ")}`))
        SetValuesChanged([])
        classToastList.addToast(setMessageList, "ok")
        resetOt()
    }
    const handlePriority = () => {
        const isCanEdit = permissions.editPriority(rol)
        if (!isCanEdit) return
        const newPriority = ClassPriorityOt.handleClick(ot.priority)
        handleChangeOt("priority", newPriority)
    }
    const handleEditingOt = (isSaving) => {
        if (isSaving === true) save()
        if (isSaving === false) resetOt()
        setIsEditing(prev => !prev)
    }
    const handlePrintOt = () => {
        setIsPrint(prev => !prev)
    }
    return { ot, changes, messageList, isEditing, isPrint, handleEditingOt, handleChangeOt, handlePriority, handlePrintOt }
}
const initialValue = {
    "id": null,
    "priority": null,
    "OTKey": "",
    "Client": null,
    "Date": dayjs(),
    "Producto": "",
    "Marca": "",
    "Modelo": "",
    "NormaAplicar": "",
    "Cotizacion": "",
    "FechaVencimiento": null,
    "FechaEstimada": dayjs(),
    "Type": null,
    "Description": [{ item: "", Description: "", import: 0 }],
    "StateProcess": null,
    "Observations": "",
    "Changes": null,
    "Auth": null,
    "Activities": null,
    "IdClient": null,
    "Availability": null,
    "Factura": null,
    "nLacre": "",
    "contractName": null,
    "Contact": []
}

const formatString = (string) => string ? JSON.parse(string) : string
const formatToString = (array) => array ? JSON.stringify(array) : array
export default useOtData;