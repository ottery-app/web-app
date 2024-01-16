import {BACKEND_API} from "@api_env";
import Clide from "../../ottery-clide"

export const clideInst = new Clide({
    //baseURL: "https://3b5e-2600-1004-a031-3b57-2197-2672-7299-e630.ngrok-free.app" + "/api/",
    baseURL: BACKEND_API + "/api/",
    timeout: 10000,
});
clideInst.defaults.headers.common['ngrok-skip-browser-warning'] = true;

export const query_delta = 500;