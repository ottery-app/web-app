import {BACKEND_API} from "@api_env";
import Clide from "../../ottery-clide"

export const clideInst = new Clide({
    baseURL: "https://97d6-2600-1004-a031-10e4-815a-eb0c-f266-bb66.ngrok-free.app" + "/api/",
    //baseURL: BACKEND_API + "/api/",
    timeout: 10000,
});
clideInst.defaults.headers.common['ngrok-skip-browser-warning'] = true;

export const query_delta = 500;