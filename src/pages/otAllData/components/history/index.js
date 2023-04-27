import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postData from '../../../../hooks/postData';

import Style from './history.module.css'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SelectMultiple from '../selectMultiple';
import getDataFromUrl from '../../../../hooks/getDataFromUrl';
export default function History() {
    const [History, setHistory] = useState()
    const [Users, setUsers] = useState()
    const [Order, setOrder] = useState("Ascendente")
    const [userSelect, setUserSelect] = useState("all")
    let { id } = useParams();
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await postData('http://localhost:4000/getOneHistory', { id });
                const data = response[0];
                if (data) {
                    const changes = JSON.parse(data.Changes);
                    setHistory(orderChanges(changes));
                }
            } catch (error) {
                console.error(error);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await getDataFromUrl('http://localhost:4000/getUsers');
                const usersName = [] 
                response.forEach(element => {usersName.push(element.name)});
                setUsers(usersName)
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
        fetchHistory();
    }, [id])

    let onChangeOrder = (event) => {
        let value = event.target.value
        let TypeOrders = {
            Ascendente: true,
            Descendente: false
        }
        setOrder(value)
        const changesOrdened = orderChanges(History, TypeOrders[value]);
        const changesFiltered = filterbByUsers(changesOrdened, userSelect);
        setHistory(changesFiltered);
    }
    return (
        <>
            {History ? (
                <>
                    <div className={Style.Filters}>
                        {/* <FormControl fullWidth sx={{ width: "7%", margin: "0 1%" }}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl> */}
                        {/* <FormControl fullWidth sx={{ width: "7%", margin: "0 1%" }}>
                            <InputLabel id="demo-simple-select-label">Usuarios</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Usuarios"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl> */}
                        <SelectMultiple Users={Users} setUser={setUserSelect}/>
                        <FormControl fullWidth sx={{ width: "15%", margin: "0 1%" }}>
                            <InputLabel id="demo-simple-select-label">Orden</InputLabel>
                            <Select
                                value={Order}
                                onChange={onChangeOrder}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                            >
                                <MenuItem value={"Ascendente"}>Ascendente</MenuItem>
                                <MenuItem value={"Descendente"}>Descendente</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Timeline position="alternate" sx={{ mb: 15, mt: 2 }}>
                        {History.map((Change, key) => {
                            return <TimelineItem key={key}>
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {new Date(Change.date).toLocaleDateString("en-GB")}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot>
                                        <BookmarksIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Typography variant="h6" component="span">
                                        {Change.userName}
                                    </Typography>
                                    <Typography variant="h10" component="p" color={"#9d9d9d"}>
                                        {Change.ChangeDescription}
                                    </Typography>
                                    <Typography variant="h10" color={"#9d9d9d"}>Comentario:      </Typography>
                                    <Typography component="span">
                                        {Change.comment}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem>
                        })}
                    </Timeline>
                </>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', margin: `9% 0%`, width: "100%" }}>
                    <Typography variant="h10" color={"#9d9d9d"}>No existen cambios en el Ot</Typography>
                </div>
            )}
        </>
    );
}

const orderChanges = (changes, ascending = true) => {
    return changes.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return ascending ? dateA - dateB : dateB - dateA;
    });
}
const filterbByUsers = (changes, userSelect = "all") => {
    return changes.filter(change => userSelect !== "all" ? change.userName === userSelect[0] : true)
}