import { useEffect, useState } from "react";
import useFetchUrl from "../useFetchUrl";
import getIp from "../getIp";
import axios from "axios";
/**
 * @typedef {'nameCompany' | 'browserLogoFile' | 'companyLogoFile'} handleType
 */

function useConfigurationHandle(createAlert, close) {
    const { data: nameCompanyData } = useFetchUrl("/getConfig")
    const [configData, setConfigData] = useState(initialConfig)

    useEffect(() => {
        setConfigData(
            {
                nameCompany: nameCompanyData && !nameCompanyData.error ? nameCompanyData : "",
                companyLogoFile: `${getIp()}:4000/getCompanyLogo`,
                browserLogoFile: `${getIp()}:4000/getCompanyLogo`
            })
    }, [nameCompanyData])

    /**
     * @param {handleType} type
     */
    const handleConfiguration = (value, type) => {
        setConfigData(prev => ({ ...prev, [type]: value }))
    }
    const saveConfiguration = async () => {
        if (!configData.nameCompany || !configData.browserLogoFile || !configData.companyLogoFile) {
            createAlert("missed data")
            return
        }
        let formData = new FormData();
        formData.append('browserLogo', configData.browserLogoFile)
        formData.append('companyLogo', configData.companyLogoFile)
        formData.append('nameCompany', configData.nameCompany)
        try {
            await axios.post(`${getIp()}:4000/postConfig`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(({ data }) => data.result).then(data => {
                    createAlert(data)
                    close()
                });

        } catch (error) {
            console.log(error);
        }
    }

    return { configData, handleConfiguration, saveConfiguration }
}
const initialConfig = {
    nameCompany: "",
    browserLogoFile: "",
    companyLogoFile: ""
}
export default useConfigurationHandle;