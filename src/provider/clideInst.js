import { BACKEND_API } from "@api_env";
import Clide from "../../ottery-clide"

console.error(BACKEND_API);

export const clideInst = new Clide({
    baseURL: BACKEND_API + "api/",
    timeout: 10000,
});

export const query_delta = 500;