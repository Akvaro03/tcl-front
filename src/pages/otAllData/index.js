import ResponsiveAppBar from "../../components/navbar";
import permissions from "../../classes/permissions";
import HistoryOt from './components/histoyOt';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Style from './otAllData.module.css'
import DataOt from './components/dataOt';
import getUser from "../../hooks/getUser";
import getOneOt from "../../db/getOneOt";

function OtAllData() {
    const [otSelected, setOtSelected] = useState()
    const [Changes, setChanges] = useState()
    let params = useParams();
    const rol = getUser("roles");
    useEffect(() => {
        let getData = async () => {
            let data = await getOneOt({ id: params.id })
                .then(resolve => resolve[0])
                .then(resolve => resolve = formatData(resolve))
            setOtSelected(data)
            setChanges(data.Changes)
        }
        getData();
    }, [params])
    const reload = async () => {
        setTimeout(async () => {
            let data = await getOneOt({ id: params.id })
                .then(resolve => resolve[0])
                .then(resolve => resolve = formatData(resolve));
            setOtSelected(data)
            setChanges(data.Changes)
        }, 1000);
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentAllData}>
                {otSelected && (
                    <DataOt otSelected={otSelected} reload={reload} />
                )}
                {Changes && (
                    permissions.seeHistory(rol) && (
                        <HistoryOt history={Changes} />
                    )
                )}
            </div>
        </>
    );
}
let formatData = (data) => {
    data.Contact = data.Contact ? JSON.parse(data.Contact) : data.Contact
    return data
}
export default OtAllData;