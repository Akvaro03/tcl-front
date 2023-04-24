import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import Style from "./cardOt.module.css"
import { useState } from "react";
function CardOt({ Ot, handleState }) {
    const [Observaciones, setObservaciones] = useState("")
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <div className={Style.HeaderCard}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {Ot.id}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {new Date(Date.parse(Ot.Date)).toLocaleDateString("en-GB")}
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
            <div className={Style.FieldObser}>
                <p>Comentarios</p>
                <TextField
                    fullWidth
                    value={Observaciones}
                    onChange={({ target: { value } }) => setObservaciones(value)}
                    sx={{ marginTop: 2 }}
                    id="outlined-multiline-flexible"
                    multiline
                    maxRows={3}
                />
            </div>

        </Card>
    );
}

export default CardOt;