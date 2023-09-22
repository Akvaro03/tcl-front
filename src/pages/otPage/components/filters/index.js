import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import typesUsers from '../../../../classes/typesUsers';
import MuiAccordion from '@mui/material/Accordion';
import getUser from "../../../../hooks/getUser";
import { Badge, Typography } from "@mui/material";
import Style from "./filters.module.css"
import styled from "@emotion/styled";
import { useState } from "react";

function Filters({ filterOt, tag, data }) {
    const [expanded, setExpanded] = useState('panel1');
    const roles = getUser("roles")
    const Tag = ({ text }) => (
        <div className={tag === text ? Style.tagSelect : Style.tag} onClick={() => { filterOt(text) }}>
            {text}
        </div>
    )
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <div className={Style.contentFilter}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ width: "100%" }}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Tag text={"Todas"} />
                </AccordionSummary>
                <AccordionDetails>
                    <Badge badgeContent={data.otToAuth ? data.otToAuth : null} color="primary">
                        <Tag text={"Sin Autorizar"} />
                    </Badge>
                </AccordionDetails>
                <AccordionDetails>
                    <Badge badgeContent={data.otToAssing ? data.otToAssing : null} color="primary">
                        <Tag text={"Sin Asignar"} />
                    </Badge>
                </AccordionDetails>
                <AccordionDetails>
                    <Badge badgeContent={data.otWaiting ? data.otWaiting : null} color="primary">
                        <Tag text={"En espera"} />
                    </Badge>
                </AccordionDetails>
                <AccordionDetails>
                    <Badge badgeContent={data.otOnProcess ? data.otOnProcess : null} color="primary">
                        <Tag text={"En proceso"} />
                    </Badge>
                </AccordionDetails>
                <AccordionDetails>
                    <Tag text={"Terminadas"} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>
                        Productos
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Badge badgeContent={data.otRetired ? data.otRetired : null} color="primary">
                        <Tag text={"Retirados"} />
                    </Badge>
                </AccordionDetails>
                <AccordionDetails>
                    <Badge badgeContent={data.otSend ? data.otSend : null} color="primary">
                        <Tag text={"Entregados"} />
                    </Badge>
                </AccordionDetails>
                <AccordionDetails>
                    <Badge badgeContent={data.otDFR ? data.otDFR : null} color="primary">
                        <Tag text={"DFR"} />
                    </Badge>
                </AccordionDetails>
            </Accordion>
            {roles.includes(typesUsers.Director) && (
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Tag text={"Facturas"} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Tag text={"OT sin facturar"} />
                    </AccordionDetails>
                    <AccordionDetails>
                        <Tag text={"Pendientes"} />
                    </AccordionDetails>
                    <AccordionDetails>
                        <Tag text={"Vencidos"} />
                    </AccordionDetails>
                    <AccordionDetails>
                        <Tag text={"Cobrados"} />
                    </AccordionDetails>
                </Accordion>
            )}
        </div>
    );
}

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    width: "80%",
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme, tag }) => ({
    display: "flex",
    alignItems: "center",
    padding: "0",
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: "5px",
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: "0px",
    width: "100%",
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    display: "flex",
    justifyContent: "flex-start",
    cursor: "pointer",
}));

export default Filters;