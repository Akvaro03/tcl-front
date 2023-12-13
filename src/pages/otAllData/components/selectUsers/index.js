import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import inputClass from "../../../../classes/inputClass";
import { useEffect, useState } from "react";
import FormPrototype from "../../../../components/formPrototype";

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
        <FormPrototype close={closeForm} tittle={"Asignar usuario"} width="70%">
            <Box sx={{ display: "grid", gridTemplateColumns:"1fr 1fr 1fr", width: "70%", flexWrap: "wrap", paddingBottom: "15px" }}>
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
        </FormPrototype>
    );
}

export default SelectUsers;