import { Button, Checkbox, FormControlLabel } from "@mui/material";
import InputMui from "../../../../components/inputMui";
import Style from "./formStep.module.css"
import { useEffect, useState } from "react";

function FormStep({ setIsFormStep, addStep, typeForm, stepSelected, editStep }) {
    const [Roles, SetRoles] = useState(rolesUser.map(datoos => { return { name: datoos, state: false } }))
    const [nameStep, setNameStep] = useState("")
    const [colorName, setColorName] = useState()
    const [colorRol, setColorRol] = useState()
    const handleChange = (event) => {
        const { name, checked } = event.target
        SetRoles(prevValues => prevValues.map(rol => (
            rol.name === name ? { ...rol, state: checked } : rol
        )))
    };
    const saveStep = () => {
        const rolFiltered = Roles.filter(rol => rol.state === true).map(rol => rol.name)
        const step = {
            nameStep: nameStep && nameStep.charAt(0).toUpperCase() + nameStep.slice(1),
            roles: rolFiltered
        }
        if (nameStep && rolFiltered[0]) {
            if (typeForm) {
                editStep(stepSelected, step)
            } else {
                addStep(step)
            }
            setIsFormStep(false)
        }
        if (!nameStep) {
            missData("name")
        }
        if (!rolFiltered[0]) {
            missData()
        }
    }
    const missData = (type) => {
        if (type === "name") {
            setColorName({ borderBottom: `1px solid #ff0202b8` })
        } else {
            setColorRol({ borderBottom: `1px solid #ff0202b8` })
        }
    }
    useEffect(() => {
        if (typeForm) {
            setNameStep(stepSelected.nameStep)
            SetRoles(prevValues => prevValues.map(rol => (
                stepSelected.roles.includes(rol.name) ? { ...rol, state: true } : rol
            )))
        }
    }, [stepSelected, typeForm])

    return (
        <div className={Style.formStepContent}>
            <div className={Style.nameStep}>
                <div className={Style.tittleInput}>
                    <p style={colorName}>Nombre del paso</p>
                </div>
                <InputMui value={nameStep} onChange={setNameStep} />
            </div>
            <div className={Style.tittleSelect}>
                <p style={colorRol}>Selecciona los tipos de Usuarios</p>
            </div>
            <div className={Style.rolesUserContent}>
                <div className={Style.roles}>
                    {Roles.map((nameRole, key) => {
                        const { name } = nameRole
                        const { state } = nameRole
                        return <FormControlLabel
                            key={key}
                            control={
                                <Checkbox checked={state} onChange={handleChange} name={name} />
                            }
                            label={name}
                        />
                    }
                    )}
                </div>
            </div>
            <div className={Style.buttons}>
                <Button size="large" onClick={saveStep} variant="contained">Guardar</Button>
                <Button size="large" onClick={() => { setIsFormStep(false) }} variant="outlined">Cancelar</Button>
            </div>
        </div>
    );
}

const rolesUser = ["Trabajador", "Administrador", "Gerente", "Programador", "Ingeniero"]
export default FormStep;