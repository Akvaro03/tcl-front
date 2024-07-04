import { Fab, Fade } from "@mui/material";
import permissions from "../../../../classes/permissions";
import getUser from "../../../../hooks/getUser";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

function EditOt({ edit, handleEdit }) {
    const rol = getUser("roles")
    return (
        permissions.editOt(rol) && (
            <>
                {edit ? (
                    <>
                        <Fade in={true}>
                            <Fab color="error" aria-label="add" onClick={handleEdit} sx={{ position: "fixed", right: "100px", bottom: "40px", zIndex: 1 }}>
                                <ClearIcon />
                            </Fab>
                        </Fade>
                        <Fade in={true}>
                            <Fab color="success" aria-label="add" onClick={() => handleEdit(true)} sx={{ position: "fixed", right: "40px", bottom: "40px", zIndex: 1 }}>
                                <SaveIcon />
                            </Fab>
                        </Fade>
                    </>
                ) : (
                    <Fade in={true}>
                        <Fab color="primary" aria-label="add" onClick={handleEdit} sx={{ position: "fixed", right: "40px", bottom: "40px", zIndex: 1 }}>
                            <EditIcon />
                        </Fab>
                    </Fade>
                )}
            </>
        )
    );
}

export default EditOt;