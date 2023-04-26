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


import BookmarksIcon from '@mui/icons-material/Bookmarks';
export default function History() {
    let { id } = useParams();
    const [History, setHistory] = useState([{}])
    useEffect(() => {
        let getData = () => {
            postData('http://localhost:4000/getOneHistory', { id: id })
                .then(data => JSON.parse(data[0].Changes))
                .then(data => {
                    setHistory(OrderChanges(data));
                })
        }
        getData()
    }, [id])

    return (
        <Timeline position="alternate">
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
    );
}


let OrderChanges = (Changes) => {
    let newChanges = Changes.sort((dat1, dat2) => {
        if (new Date(dat1.date).getTime() < new Date(dat2.date).getTime()) {
            return -1
        } else {
            return 1
        }
    })
    return newChanges
}
