import { blue, grey } from '@mui/material/colors';
import Style from './formCreateClient.module.css';
import { forwardRef, useState } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import Input from '@mui/base/Input';
import nameUsed from '../../../db/nameUsed';
import postData from '../../../hooks/postData';
import ModalPortal from '../../modelPortal';
import Alerts from '../../alerts';
function FormCreateClient({ close, reload }) {
    const [Contacts, setContacts] = useState([{ type: "", value: "", id: 0 }, { type: "", value: "", id: 1 }, { type: "", value: "", id: 2 }]);
    const [Document, setDocument] = useState({ type: "", value: "" });
    const [BusinessName, SetBusinessName] = useState('');
    const [nameClient, setNameClient] = useState("");
    const [Result, setResult] = useState();
    const [Key, setKey] = useState("");
    let numberContacts = [0, 1, 2];

    const handleSubmit = async () => {
        let isFull = (Contacts) => {
            let newContacts = Contacts.filter(e => (
                e.type.length > 0 && e.value.length > 0
            ))
            return newContacts
        }
        let ContactVerificate = isFull(Contacts)
        if (!ContactVerificate[0] || !nameClient || !Document || !Key || !BusinessName) {
            setResult("missed data")
            setTimeout(() => {
                setResult()
            }, 3400);
            return
        }
        let Client = {
            nameClient,
            Document,
            Key,
            ContactVerificate,
            BusinessName
        }
        const isNameUsed = await nameUsed(nameClient, "client")
        if (!isNameUsed) {
            const resultClient = await postData("http://localhost:4000/postClients", Client)
            setResult(resultClient.result)
            setTimeout(() => {
                setResult()
            }, 3400);
            resetAllData()
            return
        }
        setResult("name used")
        setTimeout(() => {
            setResult()
        }, 3400);
        close && reload()
        close && close()
    };
    const handleChangeDocument = (e, type) => {
        let updateValue = {};
        updateValue[type] = e
        setDocument(Document => ({
            ...Document,
            ...updateValue
        }))
    };
    const handleChangeContacts = (e, number, type) => {
        let copy = [...Contacts]
        copy[number][type] = e;
        setContacts(copy)
    };
    const resetAllData = () => {
        setNameClient("")
        setDocument({ type: "", value: "" })
        setKey("")
        setContacts([{ type: "", value: "", id: 0 }, { type: "", value: "", id: 1 }, { type: "", value: "", id: 2 }])
        SetBusinessName("")
    }
    return (
        <div className={Style.ContentForm}>
            <div className={Style.TittleForm}>
                <p>Crear Cliente</p>
            </div>
            <form className={Style.FormClient}>
                <div className={Style.DataInputs}>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Nombre Cliente</p>
                        </div>
                        <CustomInput value={nameClient} onChange={setNameClient} />
                    </div>
                    <div className={Style.InputDocument}>
                        <div className={Style.TypeDocument}>
                            <div className={Style.InputTittleDocument}>
                                <p>Tipo de documento</p>
                            </div>
                            <div className={Style.CustomInput}>
                                <CustomInput value={Document.type} onChange={(e) => handleChangeDocument(e, "type")} />
                            </div>
                        </div>
                        <div className={Style.NDocument}>
                            <div className={Style.InputTittleDocument}>
                                <p>N° documento</p>
                            </div>
                            <div className={Style.CustomInput}>
                                <CustomInput value={Document.value} onChange={(e) => handleChangeDocument(e, "value")} />
                            </div>
                        </div>
                    </div>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Identificacion</p>
                        </div>
                        <CustomInput value={Key} onChange={setKey} />
                    </div>
                    <div className={Style.Input}>
                        <div className={Style.InputTittle}>
                            <p>Razon social</p>
                        </div>
                        <CustomInput value={BusinessName} onChange={SetBusinessName} />
                    </div>
                </div>
                <div className={Style.DataContacts}>
                    <div className={Style.ContentContacts}>
                        <p className={Style.TittleContacts}>Contactos</p>
                    </div>
                    <div>
                        {numberContacts.map((valorNumber, key) => (
                            <div className={Style.InputContact} key={key}>
                                <div className={Style.TypeDocument}>
                                    <div className={Style.InputTittleDocument}>
                                        <p>Tipo de Contacto</p>
                                    </div>
                                    <div className={Style.CustomInput}>
                                        <CustomInput value={Contacts[valorNumber].type} onChange={(e) => handleChangeContacts(e, valorNumber, "type")} />
                                    </div>
                                </div>
                                <div className={Style.NDocument}>
                                    <div className={Style.InputTittleDocument}>
                                        <p>Contacto</p>
                                    </div>
                                    <div className={Style.CustomInput}>
                                        <CustomInput value={Contacts[valorNumber].value} onChange={(e) => handleChangeContacts(e, valorNumber, "value")} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={Style.ButtonSave}>
                    {close && (
                        <Button onClick={() => close(false)} variant="outlined">Cancel</Button>
                    )}
                    <Button onClick={handleSubmit} sx={{ width: "25%" }} color='success' variant="contained">Guardar OT</Button>
                </div>
            </form>
            {Result && (
                <ModalPortal type={"alert"}>
                    <Alerts Result={Result} />
                </ModalPortal>
            )}
        </div>
    );
}
const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 80%;
    height: 5px;
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

const CustomInput = forwardRef(function CustomInput(props, ref) {
    let value = props.value;
    let onChange = props.onChange;
    return (
        <Input
            value={value}
            onChange={({ target: { value } }) => {
                onChange(value)
            }}
            slots={{ input: StyledInputElement }}
            ref={ref} />
    );
});

export default FormCreateClient;