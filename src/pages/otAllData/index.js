import ResponsiveAppBar from "../../components/navbar";
import permissions from "../../classes/permissions";
import HistoryOt from './components/histoyOt';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Style from './otAllData.module.css'
import DataOt from './components/dataOt';
import getUser from "../../hooks/getUser";
import getOneOt from "../../db/getOneOt";
import ErrorBoundary from "../../utilities/ErrorBoundary";
import ComponentError from "../../components/componentError";

function OtAllData() {
    const [otSelected, setOtSelected] = useState()
    const [Changes, setChanges] = useState()
    const [error, setError] = useState(false)

    let params = useParams();
    const rol = getUser("roles");

    useEffect(() => {
        let getData = async () => {
            let data = await getOneOt({ id: params.id })
                .then(resolve => resolve = formatData(resolve[0]))
            setOtSelected(data)
            setChanges(data.Changes)
        }
        getData()
            .catch(error => {
                setError(true)
            });
    }, [params])


    const reload = async () => {
        setTimeout(async () => {
            let data = await getOneOt({ id: params.id })
                .then(resolve => resolve[0])
                .then(resolve => resolve = formatData(resolve));
            setOtSelected(data)
            setChanges(data.Changes)
        }, 500);
    }
    return (
        <>
            <ResponsiveAppBar />
            <ErrorBoundary fallBackComponent={<ComponentError />} error={error}>
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
            </ErrorBoundary>
        </>
    );
}
let formatData = (data) => {
    data.Contact = data.Contact ? JSON.parse(data.Contact) : data.Contact
    return data
}
export default OtAllData;