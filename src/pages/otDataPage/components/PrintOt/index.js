import PrintIcon from '@mui/icons-material/Print';
import { Fab, Fade } from '@mui/material';
import ModalPortal from '../../../../components/modelPortal';
import PrintOtModal from '../../../../components/PrintOtModal';

function PrintOt({ isPrinting, handlePrint, id }) {
    return (
        <>
            <Fade in={true}>
                <Fab color="primary" aria-label="add" onClick={handlePrint} sx={{ position: "fixed", right: "100px", bottom: "40px", zIndex: 1 }}>
                    <PrintIcon />
                </Fab>
            </Fade>
            {isPrinting && (
                <ModalPortal type={"form"}>
                    <PrintOtModal Result={id} close={handlePrint} />
                </ModalPortal>
            )}
        </>
    );
}

export default PrintOt;