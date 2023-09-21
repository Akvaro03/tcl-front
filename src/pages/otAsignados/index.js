import ResponsiveAppBar from "../../components/navbar";
import React, { useEffect, useState } from 'react';
import Style from './otAsignados.module.css'
import ListCards from "./components/listCards";
import SelectView from "./components/selectView";
import { Box } from "@mui/material";
import ListItems from "./components/lisItems";
import getDataFromUrl from "../../hooks/getDataFromUrl";
import getUser from "../../hooks/getUser";
import getOneUser from "../../db/getOneUser";
function OtAsingPages() {
    const [format, SetFormat] = useState("list")
    const [User, setUser] = useState()
    const [Ots, setOts] = useState()
    const [emit, setEmit] = useState()
    const handleSetUser = (newUser) => {
        setUser(newUser)
    }

    useEffect(() => {
        reload(setUser, setOts, setEmit);
    }, [])

    return (
        <>
            <ResponsiveAppBar />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", position: "fixed" }}>
                <SelectView SetFormat={SetFormat} format={format} />
            </Box>
            {Ots || emit ? (
                format === "cards" ? (
                    <div className={Style.ContentAssing}>
                        <ListCards User={User} Ots={Ots} setUser={handleSetUser} />
                    </div>
                ) : (
                    <Box sx={{ width: "100%", height: "76vh", display: "flex", justifyContent: "center", marginTop: "40px" }}>
                        <ListItems Ots={Ots} emit={emit} reload={() => reload(setUser, setOts, setEmit, true)} user={User} />
                    </Box>
                )
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
    // if (wait) {
    //     setTimeout(() => {
    //         fetchData(setOts)
    //     }, 800);
    //     return
    // }
    // fetchData(setOts, setEmit, user)
}
const fetchData = async (setOts, setEmit, user) => {
    return getDataFromUrl('/getOT')
        .then(json => {
            const Team = JSON.parse(user.Team)
            if (Team[0]) {
                setEmit(getEmit(json, Team, user.name))
            }
            json = filterByName(json, user.name);
            setOts(json.length > 0 ? json : null)
        })
}
const getEmit = (json, Team, name) => {
    return json.filter(ot => {
        const activities = JSON.parse(ot.Activities);
        return activities.filter(Activity => {
            const users = JSON.parse(Activity.users);
            return tienenValoresEnComun(users, Team);
        }).length > 0; // Agregué .length > 0 para que devuelva un resultado booleano
    });
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
function tienenValoresEnComun(array1, array2) {
    return array1.some(item => array2.includes(item));
}

export default OtAsingPages;