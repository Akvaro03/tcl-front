import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import postData from "../../../../hooks/postData";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import formatDataToTable from "../../../../hooks/formatDataToTable";

function ListUsers({ Users, SelectOt, setUsers, setOts }) {
    const [state, setState] = useState(Users);
    const SearchForEqueal = (objet, DataToFound) => {
        let found = false;
        objet.forEach(element => {
            if (Number(element) === Number(DataToFound)) {
                found = true;
            }
        });
        return found
    }

    useEffect(() => {
        let usuarios = [];
        Users.forEach((user, index) => {
            let Ots;
            let result;
            if (user.otAssign !== null) {
                Ots = JSON.parse(user.otAssign).data
                result = SearchForEqueal(Ots, SelectOt.id)
            } else {
                result = false
            }
            user.state = result
            usuarios.push(user)
        });
        setState(usuarios)
    }, [SelectOt, Users])

    const handleChange = ({ target }) => {
        let data = [...state];

        data[Number(target.id)] = { ...data[Number(target.id)], state: !data[Number(target.id)].state }

        setState(data);

    };

    const handleSubmit = () => {
        postData('http://localhost:4000/editUsers', { state, idOt: SelectOt.id });
        postData('http://localhost:4000/editOt', { state, idOt: SelectOt.id });
        setTimeout(async () => {
            await getDataFromUrl('http://localhost:4000/getUsers')
                .then(data => setUsers(data))
            await getDataFromUrl('http://localhost:4000/getOT')
                .then(json => {
                    json = formatDataToTable(json, setOts);
                })
        }, 300);
    }
    return (
        <FormGroup>
            <p style={{ fontFamily: "Segoe UI, Roboto, Helvetica Neue, Ubuntu, sans-serif", fontSize: "15px", fontWeight: 600 }}>Seleccionar Trabajadores para {SelectOt.id}</p>
            {state.map((element, key) => {
                const data = state[key]
                if (data.state !== undefined) {
                    return <FormControlLabel
                        key={key}
                        control={
                            <Checkbox key={key} id={String(key)} checked={data.state} onChange={(e) => handleChange(e)} name="gilad" />
                        }
                        label={element.name}
                    />
                }
                return <p key={key} >No hay usuario...</p>
            })}
            <Button sx={{ marginTop: "4%" }} onClick={handleSubmit} variant="contained">Guardar</Button>
        </FormGroup>
    );
}
export default ListUsers;