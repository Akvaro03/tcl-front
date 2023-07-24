import { Box, Button, Checkbox, Fade, FormControlLabel } from "@mui/material";
import getDataFromUrl from '../../../../hooks/getDataFromUrl';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

function FormSelectUser({ closeForm, usersSelect, handleUsers }) {
    const [users, setUsers] = useState()
    const [userTeam, setUserTeam] = useState(JSON.parse(usersSelect.Team))
    useEffect(() => {
        getDataFromUrl("http://localhost:4000/getUsers")
            .then(data => setUsers(data))
    }, [])
    const handleChecked = (checked, name) => {
        if (checked) {
            setUserTeam(prev => [...prev, name])
        } else {
            setUserTeam(prev => prev.filter(item => item !== name))
        }
    }
    const compare = (name) => {
        return userTeam.includes(name)
    }
    return (
        <Fade in={true}>
            <Box sx={{ width: "40%", height: "30%", background: "white", borderRadius: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", height: "20%", alignItems: "center", justifyItems: "end" }}>
                    <div />
                    <h1>Selecciona los usuarios</h1>
                    <Box sx={{ cursor: "pointer" }} onClick={() => closeForm()}>
                        <CloseIcon />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "70%", height: "50%" }}>
                    {users && (
                        users.map((user, key) => (
                            <div key={key}>
                                <FormControlLabel control={<Checkbox checked={compare(user.name)} onChange={({ target: { checked } }) => { handleChecked(checked, user.name) }} />} label={user.name} />
                            </div>
                        ))
                    )}
                </Box>
                <Box>
                    <Button variant="contained" onClick={() => { handleUsers(userTeam) }}>
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Fade>
    );
}

export default FormSelectUser;