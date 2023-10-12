import { Typography } from "@mui/material";

export default function TittleComponent({ text }) {
    return (
        <Typography component={"h1"} sx={{ fontSize: "19px", fontWeight: "bold", textDecoration: "underline" }}>
            {text}
        </Typography>
    )
}