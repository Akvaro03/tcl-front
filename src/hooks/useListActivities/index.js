import { useEffect, useState } from "react";
import getUser from "../getUser";
import fetchAsyncUrl from "../fetchAsyncUrl";
import { Fab } from "@mui/material";
function useListActivities() {
  const [activities, setActivities] = useState([
    { OT: "A", activity: "actividades", state: "End", button: "aa" },
  ]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const newUser = getUser();
    setUser(newUser);
    fetchAsyncUrl("/getOT")
      .then((data) => filterNullActivities(data))
      .then((data) => formatActivitiesListOt(data))
      .then((data) => filterActivitiesByName(data, newUser.name))
      .then((data) => filterNullActivities(data))
      .then((data) => console.log(data))
  }, []);

  return { activities };
}

const filterNullActivities = (listOT) =>
  listOT.filter(
    (data) => data.Activities !== null && data.Activities !== undefined
  );
const formatActivitiesListOt = (listOt) =>
  listOt.map((data) => {
    return { ...data, Activities: JSON.parse(data.Activities) };
  });

const filterActivitiesByName = (listOT, nameUser) =>
  listOT.map((OT) => {
    const Activities = OT.Activities.filter(
      (activity) => activity.users !== undefined
    )
      .map((ot) => {
        return { ...ot, users: JSON.parse(ot.users) };
      })
      .filter((activity) => activity.users.includes(nameUser));
    return { ...OT, Activities: Activities[0] ? Activities : null };
  });
export default useListActivities;
