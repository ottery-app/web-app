import { API_ENV } from "../env/api.env";
import { Clide } from "../ottery-clide/Clide";
import {TimeCache} from "../ottery-cache/TimeCache";
 
export const clideInst = new Clide({
    baseURL: process.env.REACT_APP_BACKEND_API + "api/",
    //this is longer due to some backend apis being long ones
    timeout: API_ENV.timeout,
    cache: TimeCache,
});