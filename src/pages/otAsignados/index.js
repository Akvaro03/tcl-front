import ResponsiveAppBar from "../../components/navbar";
import React, { useEffect, useState } from 'react';
import Style from './otAsignados.module.css'
import ListCards from "./components/listCards";
import SelectView from "./components/selectView";
import { Box } from "@mui/material";
import ListItems from "./components/lisItems";
import getUser from "../../components/getUser";
import postData from "../../hooks/postData";
import getDataFromUrl from "../../hooks/getDataFromUrl";
function OtAsingPages() {
    const [format, SetFormat] = useState("list")
    const [User, setUser] = useState()
    const [Ots, setOts] = useState()

    const handleSetUser = (newUser) => {
        setUser(newUser)
    }

    useEffect(() => {
        const getData = async () => {
            let user = JSON.parse(JSON.parse(getUser()).userString);
            let userLogin = await postData('http://localhost:4000/getOneUser', { name: user.name }).then(res => res[0])
            setUser(userLogin)
            getDataFromUrl('http://localhost:4000/getOT')
                .then(json => {
                    json = filterByName(json, user.name);
                    setOts(json.length > 0 ? json : undefined)
                })
        }
        getData()
    }, [])

    return (
        <>
            <ResponsiveAppBar />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <SelectView SetFormat={SetFormat} format={format} />
            </Box>
            {Ots ? (
                format === "cards" ? (
                    <div className={Style.ContentAssing}>
                        <ListCards User={User} Ots={Ots} setUser={handleSetUser} />
                    </div>
                ) : (
                    <Box sx={{ width: "100%", height: "76vh", display: "flex", justifyContent: "center" }}>
                        <ListItems User={User} Ots={Ots} />
                    </Box>
                )
            ) : (
                <HandleNoOT />
            )}
        </>
    );
}
const filterByName = (json, name) => {
    let jsonFiltered = json.filter(ot => {
        if (ot.Users !== null) {
            let users = JSON.parse(ot.Users).data;
            let found = users.find(e => e === name)
            if (found === name) {
                return true
            }
        }
        return false
    })
    return jsonFiltered;
}
const HandleNoOT = () => {
    setTimeout(() => {
        return <div className={Style.NoGrids}>
            No hay Ots asignadas
        </div>
    }, 2000);
}
export default OtAsingPages;