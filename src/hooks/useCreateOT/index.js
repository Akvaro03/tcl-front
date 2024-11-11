import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import createNewDate from "../createNewDay";
import getUser from "../getUser";
import getOTkey from "../getOTkey";
import useFetchUrl from "../useFetchUrl";

const useCreateOT = (props = null) => {
  const [OT, setOT] = useState({ ...initialValue, ...props });
  const { data: allActivities } = useFetchUrl("/getActivities");

  const editOT = (category, value) => {
    if (category === "Activities" && value.valueSelected) {
      handleActivities(value);
      return;
    }
    if (category === "Activities" && !value.valueSelected) {
      value = value.map((data) =>
        allActivities.findIndex((activity) => activity.id === data.id)
      );
    }

    if (category === "Client") {
      editOT("Contact", initialValue.Contact);
    }
    if (category === "Type") {
      const sumDays = JSON.parse(value.activities).reduce(
        (a, b) => a + b.time,
        0
      );
      editOT("FechaEstimada", dayjs().add(sumDays, "day"));
    }
    setOT((prev) => ({ ...prev, [category]: value }));
  };

  useEffect(() => {
    getOTkey(OT.Date).then((data) => editOT("OTKey", data));
  }, [OT.Date]);

  const verifyOT = (propertiesVerify = initialPropertiesVerify) => {
    const ot = clearOt();
    const allProperty = Object.getOwnPropertyNames(ot);
    for (const data of propertiesVerify) {
      if (!allProperty.includes(data)) {
        return data; // Retorna la propiedad que dio false
      }
    }
    return true; // Retorna true si todas las propiedades están presentes
  };
  
  const getOt = () => {
    try {
      const OTClear = clearOt();
      const { id, name } = getUser();

      // Validar que OT exista antes de acceder a OT.Date
      if (!OTClear || !OTClear.Date) {
        throw new Error("Datos de OT faltantes");
      }

      const Changes = [
        {
          userId: id,
          userName: name,
          ChangeDescription: `Se creó la OT`,
          date: new Date(OTClear.Date).getTime(), // Cambio para usar OTClear.Date en lugar de OT.Date
          comment: "",
        },
      ];
      return {
        ...OTClear,
        contractName: OTClear.contractSelect
          ? JSON.stringify(OTClear.contractSelect)
          : null,
        Description: OTClear.Description
          ? JSON.stringify(OTClear.Description)
          : null,
        Date: createNewDate(OTClear.Date),
        FechaEstimada: createNewDate(OTClear.FechaEstimada),
        FechaVencimiento: OTClear.FechaVencimiento
          ? createNewDate(OTClear.FechaVencimiento)
          : null,
        Contact: OTClear.Contact
          ? JSON.stringify(
              OTClear.Contact.map((data) => OTClear.Client.Contacts[data])
            )
          : "[]",
        Client: OTClear.Client?.Name || "",
        IdClient: OTClear.Client?.idEditable || "",
        Activities: OTClear.Activities
          ? JSON.stringify(OTClear.Activities.map((key) => allActivities[key]))
          : "[]",
        Identificación: `${OTClear.OTKey} ${isNullUndefined(
          OTClear.Type?.abbreviation
        )} ${isNullUndefined(OTClear.Client?.KeyUnique)}`,
        Changes: JSON.stringify(Changes),
        Type: OTClear.Type?.nameType || "",
      };
    } catch (error) {
      console.error("Error al obtener la OT:", error);
      return null; // O cualquier valor por defecto adecuado
    }
  };

  const clearOt = () => {
    const copyOT = { ...OT };
    copyOT.Description = clearDescriptionNull(copyOT.Description);
    for (let key in copyOT) {
      if (copyOT.hasOwnProperty(key)) {
        if (
          copyOT[key] === null ||
          copyOT[key] === "" ||
          (Array.isArray(copyOT[key]) && copyOT[key].length === 0)
        ) {
          delete copyOT[key];
        }
      }
    }
    return copyOT;
  };

  const resetOt = () => {
    setOT({
      ...initialValue,
      Activities: OT.Activities,
      Type: OT.Type,
      contractSelect: OT.contractName,
      Date: dayjs(),
      FechaEstimada: OT.FechaEstimada,
    });
  };

  const handleActivities = ({ valueSelected, allActivities }) => {
    if (!valueSelected) return;
    let arrayActivities = allActivities.filter((data, index) =>
      valueSelected.includes(index)
    );
    editOT("Activities", arrayActivities);
  };
  return { OT, allActivities, editOT, getOt, verifyOT, resetOt };
};

const initialValue = {
  id: null,
  priority: null,
  OTKey: getOTkey(dayjs()),
  Client: null,
  Date: dayjs(),
  Producto: "",
  Marca: "",
  Modelo: "",
  NormaAplicar: "",
  Cotizacion: "",
  FechaVencimiento: null,
  FechaEstimada: dayjs().add(30, "day"),
  Type: null,
  Description: [{ item: "", Description: "", import: 0 }],
  StateProcess: null,
  Observations: "",
  Changes: null,
  Auth: null,
  Activities: [],
  IdClient: null,
  Availability: null,
  Factura: null,
  nLacre: "",
  contractName: null,
  Contact: [],
};
const isNullUndefined = (data) =>
  (data === null) | (data === undefined) ? "" : data;
const initialPropertiesVerify = [
  "Date",
  "Type",
  "Client",
  "contractSelect",
  "Cotizacion",
  "Producto",
  "Marca",
  "Modelo",
  "Observations",
  "FechaEstimada",
  "Description",
  "Contact",
];
// const initialPropertiesVerify = [
//     "Date",
//     "Activities",
//     "Producto",
//     "Marca",
//     "Modelo",
//     "NormaAplicar",
//     "Cotizacion",
//     "nLacre",
//     "Observations",
//     "FechaEstimada",
// ]

const clearDescriptionNull = (Descriptions) => {
  const DescriptionClear = Descriptions.filter(
    (value) => value.item.length > 0
  );
  return DescriptionClear[0] ? DescriptionClear : null;
};
export default useCreateOT;
