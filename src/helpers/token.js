import {config} from "../config/config";
import {isEmpty} from "./isEmpty";
;


const ACCESS_TOKEN = config.ACCESS_TOKEN;


export function getToken() {
    return localStorage.getItem(ACCESS_TOKEN);
}

export function setToken(token) {
    localStorage.setItem(ACCESS_TOKEN, token);
}

export function isNotExistToken() {
    let token = getToken();
    return isEmpty(token);
}