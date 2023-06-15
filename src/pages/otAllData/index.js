import ResponsiveAppBar from "../../components/navbar";
import HistoryOt from './components/histoyOt';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postData from '../../hooks/postData';
import Style from './otAllData.module.css'
import DataOt from './components/dataOt';

function OtAllData() {
    const [otSelected, setOtSelected] = useState()
    const [Changes, setChanges] = useState()
    let params = useParams();
    useEffect(() => {
        let getData = async () => {
            let data = await postData('http://localhost:4000/getOneOt', { id: params.id })
                .then(resolve => resolve[0])
                .then(resolve => resolve = formatData(resolve))
            setOtSelected(data)
            setChanges(data.Changes)
        }
        getData();
    }, [params])
    const reload = async () => {
        let data = await postData('http://localhost:4000/getOneOt', { id: params.id })
            .then(resolve => resolve[0])
            .then(resolve => resolve = formatData(resolve))
        setOtSelected(data)
        setChanges(data.Changes)
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentAllData}>
                {otSelected && Changes && (
                    <>
                        <DataOt otSelected={otSelected} reload={reload} />
                        <HistoryOt history={Changes} />
                    </>
                )}
            </div>
        </>
    );
}
let formatData = (data) => {
    let ContactFormat = JSON.parse(data.Contact)
    data.ContactType = ContactFormat.type
    data.ContactValue = ContactFormat.value
    return data
}
export default OtAllData;