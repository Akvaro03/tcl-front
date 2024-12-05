import { Box } from "@mui/material";
import PriorityOt from "../../priorityOt";

export default function TableActivityWorkers({ data, Colum }) {
  data.state = data.state.toUpperCase();
  return (
    <>
      <Colum
        data={
          <Box component={"div"}>
            {<PriorityOt priority={data.priority} size="small" />}
          </Box>
        }
        width="5%"
      />
      <Colum data={data.OT} width="15%" />
      <Colum data={data.activity} width="15%" />
      <Colum data={<StateDisplay state={data.state} />} width="15%" />
      {data.state !== "END" && (
        <DisplayStateActivity
          state={data.state}
          onclick={() => data.onclick(data)}
        />
      )}
      <span
        style={{
          background: "red",
        }}
      ></span>
    </>
  );
}

const DisplayStateActivity = ({ state, onclick }) => (
  <span
    style={{
      width: "40%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    onClick={onclick}
  >
    {state === "CREATED" && <ButtonStart />}
    {state === "STARTED" && <ButtonEnd />}
  </span>
);

const ButtonStart = () => (
  <span
    style={{
      background: "linear-gradient(135deg, #34c759, #28a745)",
      padding: ".5rem 1rem",
      borderRadius: ".5rem",
      color: "white",
      fontWeight: "bold",
      fontSize: "0.9rem",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
      cursor: "pointer",
      transition: "transform 0.2s",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
  >
    Empezar Actividad
  </span>
);

const ButtonEnd = () => (
  <span
    style={{
      background: "linear-gradient(135deg, #ff3b30, #d63031)",
      padding: ".5rem 1rem",
      borderRadius: ".5rem",
      color: "white",
      fontWeight: "bold",
      fontSize: "0.9rem",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
      cursor: "pointer",
      transition: "transform 0.2s",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
  >
    Terminar Actividad
  </span>
);
const StateDisplay = ({ state }) => {
  const stateStyles = {
    STARTED: {
      text: "En progreso",
      color: "#007bff", // Azul para indicar que está en progreso
      background: "rgba(0, 123, 255, 0.1)",
    },
    END: {
      text: "Finalizado",
      color: "#28a745", // Verde para indicar finalizado
      background: "rgba(40, 167, 69, 0.1)",
    },
    CREATED: {
      text: "Sin empezar",
      color: "#ffc107", // Amarillo para indicar un estado inicial
      background: "rgba(255, 193, 7, 0.1)",
    },
  };

  const { text, color, background } = stateStyles[state] || {};

  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.3rem 0.8rem",
        borderRadius: "0.5rem",
        fontWeight: "bold",
        color: color,
        backgroundColor: background,
        fontSize: "0.9rem",
        textAlign: "center",
        minWidth: "80px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {text}
    </span>
  );
};
