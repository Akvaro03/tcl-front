import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import getDataFromUrl from "../../../../hooks/getDataFromUrl";
import Timeline from "@mui/lab/Timeline/Timeline";
import TimelineItem from "@mui/lab/TimelineItem/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent/TimelineContent";
import TimelineConnector from "@mui/lab/TimelineConnector/TimelineConnector";
import TimelineSeparator from "@mui/lab/TimelineSeparator/TimelineSeparator";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Style from "./historyOt.module.css"
function HistoryOt({ history }) {

    const [History, setHistory] = useState();
    const [firstDate, setFirstDate] = useState(dayjs('2017-04-10'));
    const [endDate, setEndDate] = useState(dayjs('2024-04-17'));
    const [Users, setUsers] = useState();
    const [HistoryModified, setHistoryModified] = useState();

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
    return (
        <div className={Style.contentHistory}>
            <Timeline position="alternate" sx={{}}>
                {History && (
                    HistoryModified.map((Change, key) => {
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
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
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
                    })
                )}
            </Timeline>
        </div>
    );
}
const orderChanges = (changes, ascending = true) => {
    return changes.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return ascending ? dateA - dateB : dateB - dateA;
    });
}
const getFirstDate = (array) => {
    return array.reduce((acc, value) => acc = (value.date < acc ? value.date : acc), array[0].date);
}
const getLastDate = (array) => {
    return array.reduce((acc, value) => acc = (value.date > acc ? value.date : acc), 0);
}

export default HistoryOt;