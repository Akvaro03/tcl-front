import axios from "axios";

function postFiles(dataUpload, url) {
    try {
        axios.post(`http://localhost:4000${url}`, dataUpload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    } catch (error) {
        console.log(error);
    }

}

export default postFiles;