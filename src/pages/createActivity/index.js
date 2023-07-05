import FormCreateActivity from "./components/formCreateActivity";
import ResponsiveAppBar from "../../components/navbar";
import { Box } from "@mui/material";

function CreateActivity() {
    return (
        <>
            <ResponsiveAppBar />
            <Box sx={{ display: "flex", width: "100%", height: "85vh", justifyContent: "center", alignItems: "center" }}>
                <FormCreateActivity />
            </Box>
        </>
    );
}

export default CreateActivity;