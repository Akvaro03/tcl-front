import useCreateContract from "../../hooks/useCreateContract";
import Style from "./formCreateContract.module.css"
import inputClass from "../../classes/inputClass";
import FormPrototype from "../formPrototype";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import Upload from "../upload";

function FormCreateContract({ contractToEdit, close }) {
    const { contract, handleChangeContract, saveContract } = useCreateContract(contractToEdit)
    const inputType = new inputClass(saveContract)
    return (
        <FormPrototype close={close} tittle={contract ? "Editar Contrato" : "Nuevo Contrato"}>
            <div className={Style.contentForm}>
                <div className={Style.inputsBox}>
                    <div className={Style.inputFormContent}>
                        <p className={Style.TittleInput}>
                            Nombre:
                        </p>
                        <div className={Style.input}>
                            {inputType.getInput(contract.name, (string => handleChangeContract(string, "name")))}
                        </div>
                    </div>
                    <div className={Style.inputFormContent}>
                        <p className={Style.TittleInput}>
                            Apodo:
                        </p>
                        <div className={Style.input}>
                            {inputType.getInput(contract.nickname, (string => handleChangeContract(string, "nickname")))}
                        </div>
                    </div>

                </div>
                <div className={Style.inputFormContent}>
                    <p className={Style.TittleInput}>
                        Archivo:
                    </p>
                    <Box sx={{ width: "30%", height: "100%" }}>
                        <Upload setFile={(data => handleChangeContract(data,"file"))} />
                    </Box>
                </div>
                <div className={Style.buttonBox}>
                    <Button variant="contained" onClick={saveContract}>
                        Guardar Tipo
                    </Button>
                </div>
            </div>
        </FormPrototype>
    );
}

export default FormCreateContract;