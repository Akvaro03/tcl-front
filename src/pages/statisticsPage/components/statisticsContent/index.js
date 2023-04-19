import Example from '../../../../components/statistics/Circle';
import UsersChart from '../../../../components/statistics/usersChart';
import Style from './statisticsContent.module.css'
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import { useEffect, useState } from 'react';
function StatisticsContent() {
    const [Users, setUsers] = useState([])
    useEffect(() => {
        getDataFromUrl('http://localhost:4000/getUsers')
            .then(json => {
                console.log(json)
                setUsers(json)
            })
    }, [])

    return (
        <div className={Style.ContentStatistics}>
            <div className={Style.TittleComponent}>
                <p>Estadisticas</p>
            </div>
            <div className={Style.Statistics}>
                <div className={Style.ContentUser}>
                    <UsersChart data={[
                        {
                            name: 'Alvaro',
                            uv: 20,
                            pv: 2400,
                            amt: 2400,
                        },
                        {
                            name: 'Gallo',
                            uv: 10,
                            pv: 1398,
                            amt: 2210,
                        },
                        {
                            name: 'Jorge',
                            uv: 17,
                            pv: 9800,
                            amt: 2290,
                        },
                    ]} />
                </div>
                <div className={Style.ContentCircle}>
                    <div className={Style.TittleCircle}>
                        <p>Ot terminadas</p>
                    </div>
                    <div className={Style.Circle}>
                        <Example data={[
                            { name: 'Terminadas', value: 40 },
                            { name: 'Pendientes', value: 20 },
                        ]} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatisticsContent;