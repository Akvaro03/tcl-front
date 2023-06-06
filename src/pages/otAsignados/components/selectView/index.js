import { Box } from "@mui/material";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
function SelectView({ SetFormat, format }) {
    const handleFormat = (type) => {
        SetFormat(type)
    }

    return (
        <Box sx={{ display: "flex", margin: "25px 25px 0 0", border: "1px solid #6e6e6e", borderRadius: "10px" }}>
            <Box onClick={() => handleFormat("list")} sx={{ borderRight: "1px solid #6e6e6e", background: format === "list" ? "#92ff6c" : "white", borderBottomLeftRadius: "9px", borderTopLeftRadius: "9px" }}>
                <FormatListBulletedIcon sx={{ margin: "5px" }} />
            </Box>
            <Box onClick={() => handleFormat("cards")} sx={{ background: format === "cards" ? "#92ff6c" : "white", borderTopRightRadius: "8px", borderBottomRightRadius: "8px" }}>
                <ViewModuleIcon sx={{ margin: "5px" }} />
            </Box>
        </Box>
    );
}

export default SelectView;