import { NGROK_BACKEND_API } from "@api_env";
import Clide from "../../ottery-clide"

export const clideInst = new Clide({
    baseURL: NGROK_BACKEND_API + "/api/",
    timeout: 10000,
});
clideInst.defaults.headers.common['ngrok-skip-browser-warning'] = true;

export const query_delta = 500;