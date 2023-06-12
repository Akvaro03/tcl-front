import Style from './otAllData.module.css'
import ResponsiveAppBar from "../../components/navbar";
import DataOt from './components/dataOt';
import HistoryOt from './components/histoyOt';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postData from '../../hooks/postData';

function OtAllData() {
    const [otSelected, setOtSelected] = useState()
    let params = useParams();
    useEffect(() => {
        let getData = () => {
            postData('http://localhost:4000/getOneOt', { id: params.id })
                .then(resolve => resolve[0])
                .then(resolve => resolve = formatData(resolve))
                .then(resolve => setOtSelected(resolve))
        }
        getData();
    }, [params])
    return (
        <>
            <ResponsiveAppBar />
            <div className={Style.ContentAllData}>
                {otSelected && (
                    <>
                        <DataOt otSelected={otSelected} />
                        <HistoryOt history={otSelected.Changes} />
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