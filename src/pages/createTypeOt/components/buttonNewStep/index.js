import TimelineSeparator from "@mui/lab/TimelineSeparator/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent/TimelineContent";
import TimelineItem from "@mui/lab/TimelineItem/TimelineItem";
import TimelineDot from "@mui/lab/TimelineDot/TimelineDot";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";

function ButtonNewStep({ setIsFormStep, text, setStepSelected }) {
    const createFormStep = () => {
        setStepSelected && setStepSelected()
        setIsFormStep(true)
    }
    return (
        <TimelineItem>
            <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>
                    <BookmarksIcon />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Fab variant="extended" onClick={createFormStep} sx={{ zIndex: 1 }}>
                    <AddIcon sx={{ mr: 1 }} />
                    {text}
                </Fab>
            </TimelineContent>
        </TimelineItem>
    );
}

export default ButtonNewStep;