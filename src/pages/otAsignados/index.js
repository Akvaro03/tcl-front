import ResponsiveAppBar from "../../components/navbar";
import React, { useEffect, useState } from 'react';
import ListItems from "./components/lisItems";
import getOneUser from "../../db/getOneUser";
import getUser from "../../hooks/getUser";
import { Box } from "@mui/material";
import fetchAsyncUrl from "../../hooks/fetchAsyncUrl";

function OtAsingPages() {
    const [User, setUser] = useState()
    const [Ots, setOts] = useState()

    useEffect(() => {
        reload(setUser, setOts);
    }, [])

    return (
        <>
            <ResponsiveAppBar />
            {/* <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", position: "fixed" }}>
                <SelectView SetFormat={SetFormat} format={format} />
            </Box> */}
            {Ots ? (
                <Box sx={{ width: "100%", height: "76vh", display: "flex", justifyContent: "center", marginTop: "40px" }}>
                    <ListItems Ots={Ots} reload={() => reload(setUser, setOts, true)} user={User} />
                </Box>
            ) : (
                <HandleNoOT />
            )}
        </>
    );
}
const HandleNoOT = () => {
    return (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", height: "70vh", fontSize: "35px" }}>
            No hay OT asignadas
        </Box>
    )
}
const reload = async (setUser, setOts, setEmit, wait) => {
    let userLogin = getUser();
    const user = await getOneUser({ name: userLogin.name }).then(user => user[0])
    setUser(user)
    if (wait) {
        setTimeout(() => {
            fetchData(setOts, setEmit, user)
        }, 800);
        return
    }
    fetchData(setOts, setEmit, user)
}
const fetchData = async (setOts, setEmit, user) => {
    return fetchAsyncUrl('/getOT')
        .then(json => {
            json = filterByName(json, user.name);
            setOts(json.length > 0 ? json : null)
        })
}
const filterByName = (json, name) => {
    return json.filter(ot => {
        if (ot.Activities) {
            const activities = JSON.parse(ot.Activities);
            return activities.filter(Activity => {
                const users = JSON.parse(Activity.users);
                if (Array.isArray(users)) {
                    return users.includes(name);
                }
                return false;
            }).length > 0; // Agregué .length > 0 para que devuelva un resultado booleano
        } else {
            return false
        }
    });
};
export default OtAsingPages;