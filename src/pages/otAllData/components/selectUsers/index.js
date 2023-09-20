import { Box, Button, Checkbox, Fade, FormControlLabel } from "@mui/material";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import inputClass from "../../../../classes/inputClass";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

function SelectUsers({ closeForm, activitySelected, handleUsers }) {
    const [users, setUsers] = useState()
    const [userAct, setUserAct] = useState(JSON.parse(activitySelected.users))
    const [score, setScore] = useState(activitySelected.score)
    useEffect(() => {
        getDataFromUrl("/getUsers")
            .then(data => setUsers(data))
    }, [])
    const compare = (name) => {
        return userAct.includes(name)
    }
    const handleChecked = (checked, name) => {
        if (checked) {
            setUserAct(prev => [...prev, name])
        } else {
            setUserAct(prev => prev.filter(item => item !== name))
        }
    }
    const inputUsers = new inputClass(() => handleUsers(userAct, score))
    return (
        <Fade in={true}>
            <Box sx={{ width: "60%", height: "40%", background: "white", borderRadius: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", height: "20%", alignItems: "center", justifyItems: "end" }}>
                    <div />
                    <h1>Selecciona los usuarios</h1>
                    <Box sx={{ cursor: "pointer" }} onClick={closeForm}>
                        <CloseIcon />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "70%", flexWrap: "wrap", paddingBottom: "15px" }}>
                    {users && (
                        users.map((user, key) => (
                            <div key={key}>
                                <FormControlLabel control={<Checkbox checked={compare(user.name)} onChange={({ target: { checked } }) => { handleChecked(checked, user.name) }} />} label={user.name} />
                            </div>
                        ))
                    )}
                </Box>
                <Box sx={{ height: "10%", display: "flex", gap: "15px", alignItems: "center", marginBottom: "5%" }}>
                    <h1>Score</h1>
                    {inputUsers.getInput(score, setScore)}
                </Box>
                <Box>
                    <Button variant="contained" onClick={() => { handleUsers(userAct, score) }}>
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Fade>
    );
}

export default SelectUsers;