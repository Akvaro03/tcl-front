import { useEffect, useState } from "react";
import fetchAsyncUrl from "../fetchAsyncUrl";
import getUser from "../getUser";
import changeStateActivityOT from "../../db/changeStateActivityOT";

function useListActivities() {
  const [activities, setActivities] = useState([]);
  const [reset, setReset] = useState(false);
  const [isFilterFinished, SetIsFilterFinished] = useState(false);

  const changeStateActivity = ({ OT, state, activity, idOT }) => {
    if (state === "End") {
      return;
    }
    const newState = state === "CREATED" ? "Started" : "End";
    changeStateActivityOT(
      { id: OT, activity, newState },
      idOT,
      "Se modifico la actividad"
    );
    setTimeout(() => {
      setReset((prev) => !prev);
    }, 500);
  };
  const changeFilterFinished = () => {
    SetIsFilterFinished((prev) => !prev);
  };

  useEffect(() => {
    const newUser = getUser();
    fetchAsyncUrl("/getOT")
      .then((data) => filterNullActivities(data))
      .then((data) => formatActivitiesListOt(data))
      .then((data) => filterActivitiesByName(data, newUser.name))
      .then((data) => filterNullActivities(data))
      .then((data) => formatOTActivities(data))
      .then((data) =>
        data.map((activity) => ({
          ...activity,
          onclick: changeStateActivity,
        }))
      )
      .then((data) => {
        return filterActiviesByState(data, isFilterFinished)
      })
      .then((data) => setActivities(data));
  }, [reset, isFilterFinished]);

  return {
    activities,
    changeStateActivity,
    isFilterFinished,
    changeFilterFinished,
  };
}
const filterActiviesByState = (listOT, filter) =>
  listOT.filter((activity) => (activity.state !== "End" && !filter) | ( filter) );
// Función para eliminar actividades nulas
const filterNullActivities = (listOT) =>
  listOT.filter((data) => data.Activities);

// Función para parsear JSON dentro de las actividades
const formatActivitiesListOt = (listOt) =>
  listOt.map((data) => ({
    ...data,
    Activities: JSON.parse(data.Activities),
  }));

// Función para filtrar actividades por usuario
const filterActivitiesByName = (listOT, nameUser) =>
  listOT.map((OT) => {
    const Activities = OT.Activities.filter(
      (activity) => activity.users && activity.users.includes(nameUser)
    ).map((activity) => ({
      ...activity,
      users: JSON.parse(activity.users),
    }));
    return { ...OT, Activities: Activities.length ? Activities : null };
  });

// Función para formatear las actividades de OT
const formatOTActivities = (listOT) =>
  listOT.flatMap((OT) =>
    OT.Activities.map((activity) => ({
      OT: OT.OTKey,
      idOT: OT.id,
      activity: activity.name,
      state: activity.state,
    }))
  );
export default useListActivities;
