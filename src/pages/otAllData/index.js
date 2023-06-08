import Style from './otAllData.module.css'
import ResponsiveAppBar from "../../components/navbar";
import ModalOt from "./components/ModalOt";
import DataOt from './components/dataOt';
import HistoryOt from './components/histoyOt';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postData from '../../hooks/postData';

function OtAllData() {
    const style = false;
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
            {style ? (

                <div className={Style.ContentPageOt}>
                    <ModalOt />
                </div>
            ) : (
                <div className={Style.ContentAllData}>
                    {otSelected && (
                        <>
                            <DataOt otSelected={otSelected} />
                            <HistoryOt history={otSelected.Changes} />
                        </>
                    )}
                </div>
            )}
        </>
    );
}
let formatData = (data) => {
    let UsersFormat = JSON.parse(data.Users)
    let stringUsers = "";
    UsersFormat.data.forEach((element, index) => {
        stringUsers += element;
        if (UsersFormat.data.length !== index + 1) {
            stringUsers += ", ";
        }
    });
    data.Users = stringUsers;

    let ContactFormat = JSON.parse(data.Contact)
    data.ContactType = ContactFormat.type
    data.ContactValue = ContactFormat.value
    return data
}
export default OtAllData;