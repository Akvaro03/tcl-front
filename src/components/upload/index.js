
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { useRef } from "react";
import "./upload.css"


function Upload({ data, setData }) {
    const imageUploadRef = useRef(null);

    const handleBrowser = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setData(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="container">
            <div className="avatar-upload">
                <div className="avatar-edit">
                    <input
                        type="file"
                        ref={imageUploadRef}
                        accept=".png, .jpg, .jpeg"
                        onChange={handleBrowser}
                    />
                    <Box sx={{ display: "flex", alignItems:"center" }} onClick={() => imageUploadRef.current.click()}>{<EditIcon />}</Box>
                </div>
                <div className="avatar-preview">
                    <div
                        style={{ backgroundImage: `url(${data})` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
export default Upload;
