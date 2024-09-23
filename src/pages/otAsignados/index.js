import ResponsiveAppBar from "../../components/navbar";
import React, { useEffect, useState } from "react";
import ListItems from "./components/lisItems";
import getOneUser from "../../db/getOneUser";
import getUser from "../../hooks/getUser";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import fetchAsyncUrl from "../../hooks/fetchAsyncUrl";

function OtAsingPages() {
  const [user, setUser] = useState(null);
  const [ots, setOts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData();
      setUser(userData);
      const otsData = await fetchOts(userData.name);
      setOts(otsData);
    }

    fetchData();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ paddingLeft: "15vmin", paddingTop: "2vmin" }}>
        <FormControlLabel
          control={
            <Checkbox
              onChange={({ target }) =>
                handleReload(setUser, setOts, target.checked ? ["End"] : null)
              }
            />
          }
          label="Terminadas"
        />
      </Box>
      {ots ? (
        <Box
          sx={{
            width: "100%",
            height: "76vh",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <ListItems
            Ots={ots}
            reload={() => handleReload(setUser, setOts)}
            user={user}
          />
        </Box>
      ) : (
        <NoOtMessage />  
      )}
    </>
  );
}

const NoOtMessage = () => (
  <Box
    sx={{
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh",
      fontSize: "35px",
    }}
  >
    No hay OT asignadas
  </Box>
);

const handleReload = async (setUser, setOts, states) => {
  const userData = await getUserData();
  setUser(userData);
  const otsData = await fetchOts(userData.name, states);
  setOts(otsData);
};

const fetchOts = async (userName, states) => {
  let json = await fetchAsyncUrl("/getOT");
  newFilter(json);
  json = await filterByState(
    json,
    states ? states : ["created", "Created", "Started"]
  );
  return filterByName(json, userName);
};

const filterByName = (ots, userName) => {
  return ots.filter((ot) => {
    if (ot.Activities) {
      const activities = JSON.parse(ot.Activities);
      return activities.some((activity) => {
        const users = JSON.parse(activity.users);
        return Array.isArray(users) && users.includes(userName);
      });
    }
    return false;
  });
};
const filterByState = (ots, states) => {
  return ots
    .map((ot) => {
      if (ot.Activities) {
        const activities = JSON.parse(ot.Activities);
        // Filtramos solo las actividades que cumplen con los estados
        const filteredActivities = activities.filter((activity) =>
          states.includes(activity.state)
        );

        // Si hay actividades que cumplen, actualizamos la OT
        if (filteredActivities.length > 0) {
          return {
            ...ot,
            Activities: JSON.stringify(filteredActivities),
          };
        }
      }
      return null;
    })
    .filter((ot) => ot !== null); // Filtramos las OTs que no tengan actividades válidas
};

const newFilter = (json) => {
  console.log(
    json.filter((OT) => OT.Activities).map((OT) => JSON.parse(OT.Activities))
  );
};

const getUserData = async () => {
  const userLogin = getUser();
  const [user] = await getOneUser({ name: userLogin.name });
  return user;
};

export default OtAsingPages;
