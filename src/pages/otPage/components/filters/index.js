import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import typesUsers from '../../../../classes/typesUsers';
import MuiAccordion from '@mui/material/Accordion';
import getUser from "../../../../hooks/getUser";
import { Typography } from "@mui/material";
import Style from "./filters.module.css"
import styled from "@emotion/styled";
import { useState } from "react";

function Filters({ filterOt, tag }) {
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
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" tag={tag}>
                    <Tag text={"Todas"} />
                </AccordionSummary>
                <AccordionDetails>
                    <Tag text={"En proceso"} />
                </AccordionDetails>
                <AccordionDetails>
                    <Tag text={"Asignar"} />
                </AccordionDetails>
                <AccordionDetails>
                    <Tag text={"Autorizar"} />
                </AccordionDetails>
                <AccordionDetails>
                    <Tag text={"Terminar"} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>
                        Productos
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Tag text={"Retirados"} />
                </AccordionDetails>
                <AccordionDetails>
                    <Tag text={"Entregados"} />
                </AccordionDetails>
                <AccordionDetails>
                    <Tag text={"DFR"} />
                </AccordionDetails>
            </Accordion>
            {roles.includes(typesUsers.Gerente) && (
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Tag text={"Facturas"} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Tag text={"Sin facturar"} />
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