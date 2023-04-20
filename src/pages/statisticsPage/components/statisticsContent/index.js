import CircleStatistics from '../../../../components/statistics/Circle';
import UsersChart from '../../../../components/statistics/usersChart';
import Style from './statisticsContent.module.css'
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import { useEffect, useState } from 'react';
function StatisticsContent() {
    const [Users, setUsers] = useState([])
    const [Ot, setOt] = useState()
    useEffect(() => {
        getDataFromUrl('http://localhost:4000/getUsers')
            .then(json => {
                setUsers(json)
            })
        getDataFromUrl('http://localhost:4000/getOT')
            .then(json => {
                setOt(json)
            })
    }, [])

    return (
        <div className={Style.ContentStatistics}>
            <div className={Style.TittleComponent}>
                <p>Estadisticas</p>
            </div>
            <div className={Style.Statistics}>
                <div className={Style.ContentUser}>
                    <UsersChart data={Users} />
                </div>
                <div className={Style.ContentCircle}>
                    <div className={Style.TittleCircle}>
                        <p>Ot terminadas</p>
                    </div>
                    <div className={Style.Circle}>
                        <CircleStatistics data={Ot} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticsContent;