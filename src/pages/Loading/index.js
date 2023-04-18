import { CircularProgress } from "@mui/material";

function LoadingCircle() {
    return (
        <div style={{width: "100%",height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <CircularProgress size={100} />
        </div>
    );
}

export default LoadingCircle;