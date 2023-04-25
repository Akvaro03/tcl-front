import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
// import LaptopMacIcon from '@mui/icons-material/LaptopMac';
// import HotelIcon from '@mui/icons-material/Hotel';
// import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postData from '../../../../hooks/postData';

export default function History() {
    let { id } = useParams();
    const [History, setHistory] = useState([{}])
    useEffect(() => {
        let getData = () => {
            postData('http://localhost:4000/getOneHistory', { id: id })
                .then(data => setHistory(JSON.parse(data[0].Changes)))
        }
        getData()
    }, [id])

    return (
        <Timeline position="alternate">
            {History.map((Change, key) => {
                console.log(Change)
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
                            <FastfoodIcon />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                            Eat
                        </Typography>
                        <Typography>Comentario: {Change.comment}</Typography>
                    </TimelineContent>
                </TimelineItem>
            })}
        </Timeline>
    );
}
