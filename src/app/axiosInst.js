import axios from "axios";

export const axiosInst = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    //this is longer due to some backend apis being long ones
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'},
});

//this should be given any time the user makes an error
export const ERR_USER = "ERR_USER";