import Style from "./moduleConfiguration.module.css"
import InputMui from "../../../components/inputMui";
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from 'axios';

function ModuleConfiguration({ close, menssage }) {
    const [nameCompany, setnameCompany] = useState("")
    const [browserLogo, setBrowserLogo] = useState("")
    const [companyLogo, setCompanyLogo] = useState("")
    const handleSaveConfig = async () => {
        if (!nameCompany || !browserLogo || !companyLogo) {
            menssage("missed data")
            setTimeout(() => {
                menssage()
            }, 3000);
            return
        }
        const formData = new FormData();
        formData.append('file', browserLogo)
        formData.append('file', companyLogo)
        formData.append('nameCompany', nameCompany)
        try {
            await axios.post('http://localhost:4000/postConfig', formData, {
                image_name: "image_name",
                description: "image_description"
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={Style.ContentConfiguration}>
            <div className={Style.tittlePage}>
                <h1>Configuración</h1>
            </div>
            <div className={Style.formConfiguration}>
                <div className={Style.input}>
                    <div className={Style.inputTittle}>
                        <p>Nombre de la empresa</p>
                    </div>
                    <InputMui value={nameCompany} onChange={setnameCompany} sendData={handleSaveConfig} />
                </div>
                <div className={Style.input}>
                    <div className={Style.inputTittle}>
                        <p>Logo del navegador</p>
                    </div>
                    <div className="col-span-full" style={{ marginRight: 50 }}>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                        <input
                                            onChange={(e) => {
                                                setBrowserLogo(e.target.files[0])
                                            }}
                                            id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Style.inputTittle}>
                        <p>Logo de la empresa</p>
                    </div>
                    <div className="col-span-full">
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label htmlFor="companyLogo" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                        <input
                                            onChange={(e) => {
                                                setCompanyLogo(e.target.files[0])
                                            }}
                                            id="companyLogo" name="companyLogo" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Style.buttons}>
                    <Button onClick={() => close()} variant="outlined" color="success">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveConfig} variant="contained" color="success">
                        Guardar
                    </Button>
                </div>
            </div >
        </div >
    );
}

export default ModuleConfiguration;