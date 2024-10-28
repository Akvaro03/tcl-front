import { Fade } from "@mui/material";
import ResponsiveAppBar from "../../components/navbar";
import Style from "./assignedOT.module.css";
import ListPrototype from "../../components/listPrototype";
import TableActivityWorkers from "../../components/tables/TableActivityWorkers";
import useListActivities from "../../hooks/useListActivities";
import headerList from "../../classes/headerList";

function AssignedOt() {
  const { activities } = useListActivities();
  return (
    <>
      <ResponsiveAppBar />
      <div className={Style.BodyCreateOt}>
        <ListPrototype
          Table={TableActivityWorkers}
          header={headersOt.getHeader()}
          list={activities}
          height={"90%"}
        />
      </div>
    </>
  );
}

const headersOt = new headerList();
headersOt.addHeader("OT", "15%");
headersOt.addHeader("ACTIVIDADES", "15%");
headersOt.addHeader("ESTADO", "15%");
headersOt.addHeader("", "40%");

export default AssignedOt;
