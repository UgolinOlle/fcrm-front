import axios, {AxiosInstance} from "axios";

import {API_URL, EXCLUDE_API_ROUTES} from "./constants";
import store from "@/store/store";

export const $api: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": 'application/json'
    }
})

$api.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken
        const url = config.url ? config.url : ''

        if (accessToken && !EXCLUDE_API_ROUTES.includes(url)) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)