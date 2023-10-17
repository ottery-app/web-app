import { BACKEND_API, TIMEOUT } from "@api_env";
import Clide from "../../ottery-clide"

export const clideInst = new Clide({
    baseURL: BACKEND_API + "api/",
    timeout: TIMEOUT,
});