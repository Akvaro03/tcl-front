
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { useRef, useState } from "react";
import "./upload.css"


function Upload({ setFile, loadImage = () => { } }) {
    const [dataFile, setDataFile] = useState("")
    const imageUploadRef = useRef(null);

    const handleBrowser = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setDataFile(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        setFile(e.target.files[0])
        loadImage()
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
                    <Box sx={{ display: "flex", alignItems: "center" }} onClick={() => imageUploadRef.current.click()}>{<EditIcon />}</Box>
                </div>
                <div className="avatar-preview">
                    <div
                        style={{ backgroundImage: `url(${dataFile})` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
export default Upload;
