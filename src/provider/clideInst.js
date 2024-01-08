import {BACKEND_API} from "@api_env";
import Clide from "../../ottery-clide"

export const clideInst = new Clide({
    baseURL: "https://2e4c-2600-1004-a031-10e4-c889-3877-412-ac85.ngrok-free.app" + "/api/",
    //baseURL: BACKEND_API + "/api/",
    timeout: 10000,
});
clideInst.defaults.headers.common['ngrok-skip-browser-warning'] = true;

export const query_delta = 500;