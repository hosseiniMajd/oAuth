import {config} from "../config/config";
import axios from "axios";


export class HTTP {

    static async POST(url, data, successCallback, errorCallback) {
        await axios.post(
            config.BASE_URL + url,
            data
            ,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    //'Content-Type': 'application/json',
                },
                auth: {
                    username: 'web_app',
                },
            },
        ).then(response => {
            if (response.status === 200) {
                if (successCallback) {
                    successCallback(response);
                }
            }
            else if (response.status !== 200) {
                if (errorCallback) {
                    errorCallback(response);
                }
            }
        }).catch(error => {
            if (errorCallback) {
                errorCallback(error);
            } else {
                console.log(error);
            }
        })
    }

}