import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import Style from "./cardOt.module.css"
function CardOt({ Ot,handleState}) {
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
                <CardActions>
                    {Ot.StateProcess === "Created" ? (
                        <Button variant="contained" onClick={() => {handleState(Ot.id, "Started")}}>Start</Button>
                        ) : Ot.StateProcess === "Started" && (
                        <Button variant="contained" onClick={() => {handleState(Ot.id, "Terminado")}}>End</Button>
                    )} 
                </CardActions>
            </Card>
    );
}

export default CardOt;