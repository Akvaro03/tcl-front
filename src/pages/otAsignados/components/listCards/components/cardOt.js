import { Button, Card, CardActions, CardContent, Fade, Typography } from "@mui/material";
import Style from "./cardOt.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CardOt({ Ot, handleState }) {
    const [Observaciones, setObservaciones] = useState("")
    const navigate = useNavigate();
    return (
        <Fade in={Ot.hasOwnProperty("id")}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <div className={Style.HeaderCard}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {Ot.id}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {new Date(Ot.Date).toLocaleDateString("en-GB")}
                        </Typography>
                    </div>
                    <Typography variant="h5" component="div">
                        {Ot.Modelo}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {Ot.Client}
                    </Typography>
                    <div className={Style.ContentCard}>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {Ot.StateProcess}
                        </Typography>
                    </div>
                </CardContent>
                <Typography sx={{ ml: 1.7 }} color="text.secondary">
                    {Ot.Type}
                </Typography>
                <CardActions>
                    {Ot.StateProcess === "Created" ? (
                        <Button variant="contained" onClick={() => { handleState(Ot.id, "Started", Observaciones); setObservaciones(""); }}>Start</Button>
                    ) : Ot.StateProcess === "Started" ? (
                        <>
                            <Button variant="contained" onClick={() => { handleState(Ot.id, "Terminado", Observaciones, Ot.Type); setObservaciones(""); }}>End</Button>
                            <Button variant="contained" onClick={() => { handleState(Ot.id, "Created", Observaciones, Ot.Type); setObservaciones(""); }}>PrevState</Button>
                        </>
                    ) : Ot.StateProcess === "Terminado" && (
                        <Button variant="contained" onClick={() => { handleState(Ot.id, "Started", Observaciones, Ot.Type); setObservaciones(""); }}>PrevState</Button>
                    )}
                </CardActions>
                <div className={Style.ButtonHistory}>
                    <Button variant="text" onClick={() => { navigate(`/events/${Ot.id}`) }}>Ver todos los datos</Button>
                </div>
            </Card>
        </Fade>
    );
}

export default CardOt;