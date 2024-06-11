import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getOneOt from "../../db/getOneOt";

function useOtData() {
    let { id } = useParams();
    const [ot, setOt] = useState(initialValue)
    const [changes, setChanges] = useState()
    const [reset, setReset] = useState(false)
    const [valuesChanged, SetValuesChanged] = useState([])
    useEffect(() => {
        if (valuesChanged.includes("Auth")) {
            save()
        }
    }, [ot])

    useEffect(() => {
        id && getOneOt({ id })
            .then(data => formatOt(data[0]))
            .then(data => {
                setOt(data)
                setChanges(data.Changes)
            })
    }, [id, reset])
    const formatOt = (ot) => {
        return { ...ot, Activities: formatString(ot.Activities), Changes: formatString(ot.Changes), Contact: formatString(ot.Contact), Description: formatString(ot.Description), contractName: formatString(ot.contractName) }
    }
    const resetOt = () => {
        setReset(prev => !prev)
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
    const save = () => {
        console.log(valuesChanged)
    }

    return { ot, changes, resetOt, handleChangeOt }
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
export default useOtData;