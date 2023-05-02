import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Style from './history.module.css'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { Fade, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SelectMultiple from '../selectMultiple';
import getDataFromUrl from '../../../../hooks/getDataFromUrl';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import formatDate from '../../../../hooks/formatDate';
export default function History({ isConfig, history }) {
    const [History, setHistory] = useState()
    const [HistoryModified, setHistoryModified] = useState()
    const [Users, setUsers] = useState()
    const [Order, setOrder] = useState("Ascendente")
    const [firstDate, setFirstDate] = useState(dayjs('2017-04-10'))
    const [endDate, setEndDate] = useState(dayjs('2024-04-17'))
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                    const changes = JSON.parse(history);
                    console.log(changes)
                    const changesOrdened = orderChanges(changes);
                    setFirstDate(dayjs(getFirstDate(changes)))
                    setEndDate(dayjs(getLastDate(changes)))
                    console.log(changesOrdened)
                    setHistory(changesOrdened);
                    setHistoryModified(changesOrdened);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await getDataFromUrl('http://localhost:4000/getUsers');
                const usersName = []
                response.forEach(element => { usersName.push(element.name) });
                setUsers(usersName)
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
        fetchHistory();
    }, [history])
    const onChangeName = (event) => {
        const data = filterbByUsers(History, event)
        setHistoryModified(data);
    }
    const onChangeOrder = (event) => {
        const value = event.target.value
        const typeOrders = {
            Ascendente: true,
            Descendente: false
        }
        const order = typeOrders[value];
        setOrder(value)
        setHistoryModified(orderChanges(History, order));
    }
    const onChangeDate = (FirstDate, EndDate) => {
        setFirstDate(FirstDate)
        setEndDate(EndDate)
        setHistoryModified(filterByDates(History, FirstDate, EndDate))
    }
    return (
        <>
            {History ? (
                <>
                    {isConfig && (
                        <Fade in={isConfig}>
                            <div className={Style.Filters}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        sx={{ width: "18%", margin: "0 1%" }}
                                        value={firstDate} onChange={(newValue) => onChangeDate(newValue, endDate)}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        sx={{ width: "18%", margin: "0 1%" }}
                                        value={endDate} onChange={(newValue) => onChangeDate(firstDate, newValue)}
                                    />
                                </LocalizationProvider>

                                <SelectMultiple Users={Users} setUser={onChangeName} />
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
                        </Fade>
                    )}
                    <Timeline position="alternate" sx={{ mb: 15, mt: 2 }}>
                        {HistoryModified.map((Change, key) => {
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
const filterbByUsers = (changes, userSelect = "[]") => {
    const UsersString = JSON.stringify(userSelect)
    return changes.filter(change => UsersString !== "[]" ? userSelect.includes(change.userName) : true)
}
const filterByDates = (changes, firstDate, endDate) => {
    const firstMiliseconds = formatDate(firstDate);
    const endMiliseconds = formatDate(endDate);
    return changes.filter(a => {
        const formatDate = new Date(a.date).getTime();
        return (firstMiliseconds <= formatDate && formatDate <= endMiliseconds)
    })
}
const getFirstDate = (array) => {
    return array.reduce((acc, value) => acc = (value.date < acc ? value.date : acc), array[0].date);
}
const getLastDate = (array) => {
    return array.reduce((acc, value) => acc = (value.date > acc ? value.date : acc), 0);
}