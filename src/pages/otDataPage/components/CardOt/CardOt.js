import ItemCard from "../ItemCard/itemCard";
import Style from "./CardOt.module.css";
import formatDateM from "../../../../hooks/formatDateM";
import ButtonAuth from "../../../../components/buttonAuth";
import { Box } from "@mui/material";
import PriorityOt from "../../../../components/priorityOt";
import ClientContactComponent from "../../../../components/ClientContactComponent";
import ActivitiesComponent from "../../../../components/ActivitiesComponent";
import AvailabilityComponent from "../../../../components/AvailabilityComponent";
// import FacturaComponent from "../../../../components/FacturaComponent";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputMui from "../../../../components/inputMui";
import SelectContact from "../../../../components/selectContract";
import DescriptionComponent from "../../../../components/DescriptionComponent";
import permissions from "../../../../classes/permissions";
import getUser from "../../../../hooks/getUser";
function CardOt({ ot, handleChangeOt, handlePriority, isEditing }) {
  const rol = getUser("roles");

  return (
    <div className={Style.cardData}>
      <Box
        position={"absolute"}
        right={"6%"}
        zIndex={2}
        top={"-1%"}
        color={"white"}
        component={"div"}
        onClick={handlePriority}
      >
        <PriorityOt priority={ot.priority} />
      </Box>
      <ItemCard tittle={"OT Seleccionada"} isTittle isFirst>
        {ot.OTKey}
      </ItemCard>
      <ItemCard tittle={"Autorización"}>
        <ButtonAuth
          onclick={() => handleChangeOt("Auth", ot.Auth === "1" ? "0" : "1")}
          auth={ot.Auth}
        />
      </ItemCard>
      <ItemCard tittle={"ID de OT"}>{ot.id}</ItemCard>
      <ItemCard tittle={"Tipo de OT"}>{ot.Type}</ItemCard>
      <ItemCard tittle={"Fecha"}>
        {
          <H1EditableDate
            onChange={(data) => handleChangeOt("Date", data)}
            edit={isEditing}
            text={ot.Date}
          />
        }
      </ItemCard>
      <ItemCard tittle={"Vto. DEL CERTIFICADO"}>
        {
          <H1EditableDate
            onChange={(data) => handleChangeOt("FechaVencimiento", data)}
            edit={isEditing}
            text={ot.FechaVencimiento}
          />
        }
      </ItemCard>
      <ItemCard tittle={"Nº Lacre"}>
        <H1Editable
          text={ot.nLacre}
          edit={isEditing}
          onChange={(data) => handleChangeOt("nLacre", data)}
        />
      </ItemCard>
      <ItemCard tittle={"Contrato"}>
        {/* {ot.contractName?.label} */}
        <H1EditableContract
          text={ot.contractName?.label}
          edit={isEditing}
          onChange={(data) => handleChangeOt("contractName", data)}
        />
      </ItemCard>

      <ItemCard isSpace />

      <ItemCard tittle={"Cliente Informacion"} isTittle />
      <ItemCard tittle={"Empresa"}>{ot.Client}</ItemCard>
      <ItemCard tittle={"N° Cliente"}>{ot.IdClient}</ItemCard>
      <ItemCard tittle={"Contacto"}>
        <ClientContactComponent
          contacts={ot.Contact}
          saveChanges={(data) => handleChangeOt("Contact", data)}
        />
      </ItemCard>

      <ItemCard isSpace />

      <ItemCard tittle={"Actividades"} isTittle>
        <ActivitiesComponent
          Activities={ot.Activities}
          saveChanges={(data) => handleChangeOt("Activities", data)}
        />
      </ItemCard>

      <ItemCard isSpace />

      <ItemCard tittle={"Producto"} isTittle />
      <ItemCard tittle={"Nombre"}>
        <H1Editable
          text={ot.Producto}
          edit={isEditing}
          onChange={(data) => handleChangeOt("Producto", data)}
        />
      </ItemCard>
      <ItemCard tittle={"Marca"}>
        <H1Editable
          text={ot.Marca}
          edit={isEditing}
          onChange={(data) => handleChangeOt("Marca", data)}
        />
      </ItemCard>
      <ItemCard tittle={"Modelo"}>
        <H1Editable
          text={ot.Modelo}
          edit={isEditing}
          onChange={(data) => handleChangeOt("Modelo", data)}
        />
      </ItemCard>
      <ItemCard tittle={"Cotizacion"}>
        <H1Editable
          text={ot.Cotizacion}
          edit={isEditing}
          onChange={(data) => handleChangeOt("Cotizacion", data)}
        />
      </ItemCard>
      <ItemCard tittle={"Disposición"}>
        <AvailabilityComponent
          Availability={ot.Availability}
          saveChanges={(data) => handleChangeOt("Availability", data)}
        />
      </ItemCard>
      <ItemCard tittle={"Observación"}>
        <H1Editable
          text={ot.Observations}
          edit={isEditing}
          onChange={(data) => handleChangeOt("Observations", data)}
        />
      </ItemCard>

      <ItemCard isSpace />

      {/* <ItemCard tittle={"Facturación"} isTittle />
            <ItemCard tittle={"Facturación"}>
                <FacturaComponent facturas={ot.Factura} saveChanges={(data) => handleChangeOt("Factura", data)} />
            </ItemCard> */}
      {permissions.seeDetails(rol) && (
        <ItemCard tittle={"Detalles"} isLast>
          <DescriptionComponent
            Description={ot.Description}
            saveDescription={(data) => handleChangeOt("Description", data)}
          />
        </ItemCard>
      )}
    </div>
  );
}
const H1EditableDate = ({ edit, text, onChange }) => {
  if (edit) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="DD/MM/YYYY"
          slotProps={{ textField: { size: "small" } }}
          value={dayjs(text)}
          onChange={(date) => onChange(new Date(date).getTime())}
        />
      </LocalizationProvider>
    );
  }

  return <h1>{formatDateM(text)}</h1>;
};
const H1Editable = ({ edit, text, onChange }) => {
  if (edit) {
    return <InputMui value={text ? text : " "} onChange={onChange} />;
  }

  return <h1>{text}</h1>;
};

const H1EditableContract = ({ edit, text, onChange }) => {
  if (edit) {
    return <SelectContact defaultValue={text} setData={onChange} />;
  }
  return <h1>{text}</h1>;
};
export default CardOt;
