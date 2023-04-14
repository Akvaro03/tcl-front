import { Button, Grow, TextField } from '@mui/material';
import * as React from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';

import Style from './FormModal.module.css'
import styled from '@emotion/styled';
function FormModal({ SetClose }) {
    return (
        <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...(true ? { timeout: 800 } : {})}
        >
            <div className={Style.ContentForm}>
                <div className={Style.ContentDescription}>
                    <p>Descripcion del trabajo solicitado</p>
                    <div className={Style.TableDescription}>
                        <div className={Style.Headers}>
                            <p>Item</p>
                            <p>Descripcion</p>
                            <p>Importe</p>
                        </div>
                        <div className={Style.Table}>
                            <div className={Style.TableItem}>
                                <CustomInput />
                            </div>
                            <div>
                                <CustomInput />
                            </div>
                            <div className={Style.TableImport}>
                                <CustomInput />
                            </div>
                            <div className={Style.TableItem}>
                                <CustomInput />
                            </div>
                            <div>
                                <CustomInput />
                            </div>
                            <div className={Style.TableImport}>
                                <CustomInput />
                            </div>
                            <div className={Style.TableItem}>
                                <CustomInput />
                            </div>
                            <div>
                                <CustomInput />
                            </div>
                            <div className={Style.TableImport}>
                                <CustomInput />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Style.ContentObser}>
                    <p>Observaciones</p>
                    <div className={Style.FieldObser}>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 4 }}
                            id="outlined-multiline-flexible"
                            label="Multiline"
                            multiline
                            maxRows={4}
                        />

                    </div>
                    <div className={Style.ButtonSave}>
                        <Button onClick={() => SetClose(false)} fullWidth color='success' variant="contained">Guardar datos</Button>
                    </div>
                </div>
            </div>
        </Grow>

    );
}
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

const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 76%;
    height: 10%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
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
const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
        <InputUnstyled slots={{ input: StyledInputElement }} {...props} ref={ref} />
    );
});

export default FormModal;