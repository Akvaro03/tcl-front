import ResponsiveAppBar from "../../components/navbar";
import Style from "./assignedOT.module.css";
import ListPrototype from "../../components/listPrototype";
import TableActivityWorkers from "../../components/tables/TableActivityWorkers";
import useListActivities from "../../hooks/useListActivities";
import headerList from "../../classes/headerList";
import { Checkbox, FormControlLabel } from "@mui/material";

function AssignedOt() {
  const {
    activities,
    changeStateActivity,
    changeFilterFinished,
    isFilterFinished,
  } = useListActivities();
  return (
    <>
      <ResponsiveAppBar />
      <div className={Style.BodyCreateOt}>
        <FormControlLabel
          control={
            <Checkbox
              value={isFilterFinished}
              onChange={() => changeFilterFinished()}
            />
          }
          label="Terminadas"
        />

        <ListPrototype
          Table={TableActivityWorkers}
          header={headersOt.getHeader()}
          list={activities}
          height={"80%"}
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
