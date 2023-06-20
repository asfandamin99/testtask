import { useEffect } from "react";
import axios from "../config/axiosConfig";
// import { authHeader } from "./auth-header";


const API_URL = process.env.REACT_APP_PUBLIC_API_ENDPOINT;

// {
//     headers: {
//         _id: "63e49c46e073c2cfa894ad03",
//         access_token: "1fjvlv5pf68zgdyqf467ih0xjotollp7ga",
//         cid: "5c13ae1dd53c8f3026a1c1a2",
//         x_access_token: "3ab7adbf09e53f4c8ca8912a3277d68ea44edc47c8060cd21725f646fad4e666"
//     }
// }

export default async function get(endpoint) {
    return await axios.get(API_URL + endpoint).then((response) => {

        if (response.data.results !== undefined) {
            response.extra_data = {
                count: response.data.count,
                next: response.data.next,
                previous: response.data.previous,
            };
            response.data = response.data.results;
        }
        return response;
    });
}

export async function del(endpoint, data = {}) {

    return await axios.delete(API_URL + endpoint);
}

export async function post(endpoint, data) {

    return await axios.post(API_URL + endpoint, data);
}
export async function put(endpoint, data) {

    return await axios.put(API_URL + endpoint, data);
}