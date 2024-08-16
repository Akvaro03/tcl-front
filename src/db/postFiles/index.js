import axios from "axios";

function postFiles(dataUpload, url) {
    try {
        return axios.post(`http://localhost:4000${url}`, dataUpload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => res?.data?.result)
    } catch (error) {
        console.log(error);
    }

}

export default postFiles;