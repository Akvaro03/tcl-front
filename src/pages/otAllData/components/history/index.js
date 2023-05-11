import { Fade, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import getDataFromUrl from '../../../../hooks/getDataFromUrl';
import ModalPortal from '../../../../components/modelPortal';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import TimelineContent from '@mui/lab/TimelineContent';
import formatDate from '../../../../hooks/formatDate';
import Typography from '@mui/material/Typography';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineDot from '@mui/lab/TimelineDot';
import SelectMultiple from '../selectMultiple';
import { useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import Style from './history.module.css';
import FormChange from '../formChange';
import dayjs from 'dayjs';
import postData from '../../../../hooks/postData';
export default function History({ isConfig, history, idOt }) {
    const [firstDate, setFirstDate] = useState(dayjs('2017-04-10'));
    const [endDate, setEndDate] = useState(dayjs('2024-04-17'));
    const [HistoryModified, setHistoryModified] = useState();
    const [Order, setOrder] = useState("Ascendente");
    const [ModalChange, setModalChange] = useState();
    const [History, setHistory] = useState();
    const [UserSelect, setUserSelect] = useState()
    const [Users, setUsers] = useState();
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const changes = JSON.parse(history);
                const changesOrdened = orderChanges(changes);
                setFirstDate(dayjs(getFirstDate(changes)))
                setEndDate(dayjs(getLastDate(changes)))
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
        setUserSelect(event)
        setHistoryModified(filterbByUsers(History, event));
    }
    const onChangeOrder = (event) => {
        const { value } = event.target
        setOrder(value)
        setHistoryModified(applyAllFilters(History, value, UserSelect, firstDate, endDate))
    }
    const onChangeDate = (FirstDate, EndDate) => {
        setFirstDate(FirstDate)
        setEndDate(EndDate)
        setHistoryModified(applyAllFilters(History, Order, UserSelect, FirstDate, EndDate))
    }
    const handleModalChange = (data) => {
        setModalChange((prevValue) => prevValue ? undefined : data)
    }
    const changeHistoryAndSubmit = async (newHistory) => {
        const newCopyHistory = History.map(historyItem => historyItem.date === newHistory.date ? newHistory : historyItem);
        try {
            await postData('http://localhost:4000/editOneOtChanges', { Changes: newCopyHistory, idOt });

            setHistory(newCopyHistory)
            setHistoryModified(applyAllFilters(newCopyHistory, Order, UserSelect, firstDate, endDate))
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            {History ? (
                <>
                    {isConfig && (
                        <Fade in={isConfig}>
                            <div className={Style.Filters}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Desde"
                                        format="DD/MM/YYYY"
                                        sx={{ width: "18%", margin: "0 1%" }}
                                        value={firstDate} onChange={(newValue) => onChangeDate(newValue, endDate)}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Hasta"
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
                            return <TimelineItem key={key} >
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
                                <TimelineContent sx={{ py: '12px', px: 2 }} onClick={() => handleModalChange(Change)}>
                                    <Typography variant="h6" component="span">
                                        {Change.userName}
                                    </Typography>
                                    <Typography variant="h10" component="p" color={"#9d9d9d"}>
                                        {Change.ChangeDescription}
                                    </Typography>
                                    {Change.comment.length > 0 && (
                                        <>
                                            <Typography variant="h10" color={"#9d9d9d"}>Comentario:      </Typography>
                                            <Typography component="span">
                                                {Change.comment}
                                            </Typography>
                                        </>
                                    )}
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
            {ModalChange && (
                <ModalPortal type={"form"}>
                    <FormChange changeHistoryAndSubmit={changeHistoryAndSubmit} Change={ModalChange} CloseModal={handleModalChange} />
                </ModalPortal>
            )}
        </>
    );
}

const typeOrders = {
    Ascendente: true,
    Descendente: false
}
const applyAllFilters = (Changes, ascending, userSelect, firstDate, endDate) => {
    Changes = orderChanges(Changes, typeOrders[ascending])
    Changes = filterbByUsers(Changes, userSelect)
    Changes = filterByDates(Changes, firstDate, endDate)
    return Changes;
}
const orderChanges = (changes, ascending = true) => {
    return changes.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return ascending ? dateA - dateB : dateB - dateA;
    });
}
const filterbByUsers = (changes, userSelect = []) => {
    const UsersString = JSON.stringify(userSelect)
    return UsersString !== "[]" ? changes.filter(change => userSelect.includes(change.userName)) : changes
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