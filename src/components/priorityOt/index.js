import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Fade } from '@mui/material';
import ClassPriorityOt from '../../classes/priorityOt';


export default function PriorityOt({ priority, size = "large", onClick }) {
    return priority ?
        <Fade in={true}>
            <BookmarkIcon fontSize={size} color={ClassPriorityOt.getPriorityColor(priority)} sx={{ transition: "color 5s" }} />
        </Fade>
        : <BookmarkBorderIcon fontSize={size} color='disabled' />
}