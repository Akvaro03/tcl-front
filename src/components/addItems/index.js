import { Box, Button, TextField, styled } from "@mui/material";
import FormPrototype from "../formPrototype";
import useAddItems from "../../hooks/useAddItems";
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/base/Input';
import ModalPortal from "../modelPortal";
import Style from "./addItems.module.css"
import { forwardRef } from "react";
function AddItems({ close, save, prevItems }) {
    const { items, handleDescription, deleteItems, addItems } = useAddItems(prevItems)
    return (
        <ModalPortal type={"form"}>
            <FormPrototype close={close} tittle={"Agregar Items"} width="70%">
                <Box display={"flex"} height={"40%"} width={"90%"} flexDirection={"column"}>
                    {items.map((data, key) => (
                        <div key={key} className={Style.DataInput}>
                            <div className={Style.Description}>
                                <div className={Style.ItemTable}>
                                    <span>Item</span>
                                    <CustomInput
                                        value={data.item}
                                        onChange={(e) => handleDescription(e, key, "item")}
                                    />
                                </div>
                                <Box component={"div"} display={"flex"} alignItems={"center"} onClick={() => deleteItems(key)}>
                                    X
                                </Box>
                                <div className={Style.ItemTable}>
                                    <span>Importe</span>
                                    <CustomInput
                                        value={data.import}
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
                    <Button variant='outlined' onClick={addItems} sx={{ borderRadius: "15px", margin: "15px 0" }}>
                        <div>
                            <AddIcon />
                        </div>
                        <p>
                            Agregar Items
                        </p>
                    </Button>
                </Box>
                <Box margin={"15px 0"} height={"30%"} display={"flex"} width={"100%"} gap={"15px"} alignItems={"center"} justifyContent={"center"}>
                    <Button size="small" variant="outlined" onClick={() => close(false)}>Cerrar</Button>
                    <Button size="large" variant="contained" onClick={() => save(items)}>Guardar</Button>
                </Box>
            </FormPrototype>
        </ModalPortal>
    )
}
const CustomInput = forwardRef(function CustomInput(props, ref) {
    let value = props.value;
    let onChange = props.onChange;
    let placeholder = props.placeholder;
    return (
        <Input
            placeholder={placeholder}
            value={value}
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
export default AddItems;