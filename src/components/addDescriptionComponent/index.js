import { Button, styled, TextField } from "@mui/material";
import FormPrototype from "../formPrototype";
import Style from "./addDescriptionComponent.module.css"
import Input from '@mui/base/Input';
import useFormAddDescription from "../../hooks/useFormAddDescription";
import { forwardRef } from "react";

function AddDescriptionComponent({ close, description, saveDescription }) {
    const { newDescription, handleDescription, addDescription, save } = useFormAddDescription(description, saveDescription)
    return (
        <FormPrototype close={close} tittle={"Agregar detalles"}>
            {newDescription.map((data, key) => (
                <div key={key} className={Style.containerDetails}>
                    <div className={Style.Description}>
                        <div className={Style.ItemTable}>
                            <span>Item</span>
                            <CustomInput
                                value={data.item}
                                type={"number"}
                                onChange={(e) => handleDescription(e, key, "item")}
                            />
                        </div>
                        <div className={Style.ItemTable}>
                            <span>Importe</span>
                            <CustomInput
                                value={data.import}
                                type={"number"}
                                onChange={(e) => handleDescription(e, key, "import")}
                            />
                        </div>
                    </div>
                    <TextField
                        placeholder={"Descripción"}
                        fullWidth
                        value={data.Description}
                        onChange={(e) => handleDescription(e.target.value, key, "Description")}
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={3}
                    />
                </div>
            ))}
            <div className={Style.buttons}>
                <Button variant="outlined" onClick={addDescription}>
                    Agregar Descripción
                </Button>

                <Button variant="contained" onClick={save}>
                    Guardar
                </Button>
            </div>

        </FormPrototype>
    );
}
const CustomInput = forwardRef(function CustomInput(props, ref) {
    let value = props.value;
    let onChange = props.onChange;
    let placeholder = props.placeholder;
    let type = props.type;
    return (
        <Input
            placeholder={placeholder}
            value={value}
            type={type}
            
            onChange={({ target: { value } }) => {
                onChange(value)
            }}
            slots={{ input: StyledInputElement }}
            ref={ref} />
    );
});
const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 100%;
    height: 20px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 17px;
    border-radius: 12px;
    color: ${grey[900]};
    background: ${'#fff'};
    border: 1px solid ${grey[200]};
    box-shadow: 0px 2px 2px ${grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};
const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};
export default AddDescriptionComponent;