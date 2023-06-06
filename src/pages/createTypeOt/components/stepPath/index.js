import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent/TimelineContent";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TimelineItem from "@mui/lab/TimelineItem/TimelineItem";
import TimelineDot from "@mui/lab/TimelineDot/TimelineDot";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { Fab, Fade, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function StepPath({ step, setIsFormStep, stepSelected, setStepSelected, deleteStep, editStep }) {
    const handleClicked = () => {
        setStepSelected(stepPrev => stepPrev === step ? null : step)
    }
    return (
        <TimelineItem>
            {/* Lado opuesto */}
            <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
            >
                <Fade in={stepSelected === step}>
                    <div >
                        <Fab sx={{ margin: "0 5px", zIndex: 1 }} size="small" color="primary" aria-label="add" onClick={setIsFormStep}>
                            <AddIcon />
                        </Fab>
                        <Fab sx={{ margin: "0 5px", zIndex: 1 }} size="small" color="primary" aria-label="add" onClick={deleteStep}>
                            <DeleteForeverIcon />
                        </Fab>
                        <Fab sx={{ margin: "0 5px", zIndex: 1 }} size="small" color="primary" aria-label="add" onClick={editStep}>
                            <EditIcon />
                        </Fab>
                    </div>
                </Fade>
            </TimelineOppositeContent>
            {/* Icono del step */}
            <TimelineSeparator onClick={handleClicked}>
                <TimelineConnector />
                <TimelineDot>
                    <BookmarksIcon />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            {/* Conteno de la derecha */}
            <TimelineContent onClick={handleClicked} sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                    {step.nameStep}
                </Typography>
                <Typography variant="h10" component="p" color={"#9d9d9d"}>
                    <Typography component="span" color={"#9d9d9d"} sx={{ marginRight: "7px" }} >
                        Roles asignados:
                    </Typography>

                    {step.roles.join(", ")}
                </Typography>
            </TimelineContent>
        </TimelineItem>
    )
}

export default StepPath;