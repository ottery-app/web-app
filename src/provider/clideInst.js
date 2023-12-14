import {BACKEND_API} from "@api_env";
import Clide from "../../ottery-clide"

//console.log(BACKEND_API);

export const clideInst = new Clide({
    baseURL: "https://819e-107-15-199-74.ngrok-free.app" + "/api/",
    timeout: 10000,
});
clideInst.defaults.headers.common['ngrok-skip-browser-warning'] = true;

export const query_delta = 500;