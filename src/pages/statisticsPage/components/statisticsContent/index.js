import CircleStatistics from '../../../../components/statistics/Circle';
import UsersChart from '../../../../components/statistics/usersChart';
import fetchAsyncUrl from '../../../../hooks/fetchAsyncUrl';
import Style from './statisticsContent.module.css'
import { useEffect, useState } from 'react';
function StatisticsContent() {
    const [Users, setUsers] = useState([])
    const [Ot, setOt] = useState()
    useEffect(() => {
        fetchAsyncUrl('/getUsers')
            .then(json => {
                setUsers(json)
            })
        fetchAsyncUrl('/getOT')
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
                        <p>OT terminadas</p>
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