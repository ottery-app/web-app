import axios, {AxiosInstance} from "axios";
import { TimeCache } from "../ottery-cache/TimeCache";
import { CLIDE_CONF } from "./clide.conf";

//TODO include AbortController for cancling
//TODO include cashe for cashing

/**
 * this is a porting of axios with a few extra features to better support the needs of ottery
 */
export class Clide {
    /**
     * this is the instance that is used to handle clides requests
     * @type {AxiosInstance}
     */
    instance;

    constructor(params) {
        this.instance = axios.create(params);
    }

    /**
     * @param {String} url 
     * @param {CLIDE_CONF} conf 
     * @returns 
     */
    makeRequest(url, conf) { 
        conf.url = url;
        const cache = new conf.cache(conf.cache_timeout);
        conf = Object.apply({}, CLIDE_CONF, conf);

        const that = this;
        /**
         * @param {AxiosRequestConfig} config
         */
        return async function request(config) {
            config = Object.apply({}, conf, config);

            let res;

            if (cache.get(config.url)) {
                res = cache.get(config.url);
            } else {
                res = await that.instance.request(config);
                cache.set(config.url, res);
            }

            return res;
        }
    }

    makeGet(url, conf) {
        conf.method = 'get';
        return this.makeRequest(url, conf);
    }

    makeDelete(url, conf) {
        conf.method = 'delete';
        return this.makeRequest(url, conf);
    }

    makePost(url, conf) {
        conf.method = 'post';
        return this.makeRequest(url, conf);
    }

    makePut(url, conf) {
        conf.method = 'put';
        return this.makeRequest(url, conf);
    }

    makePatch(url, conf) {
        conf.method = 'patch';
        return this.makeRequest(url, conf);
    }

    makeHead() {
        throw new Error('not yet supported');
    }

    makeOptions() {
        throw new Error('not yet supported');
    }

    makeGetUri() {
        throw new Error('not yet supported');
    }
}

let clide = new Clide({
    baseURL: process.env.REACT_APP_BACKEND_API,
    //this is longer due to some backend apis being long ones
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'},
});

const getFart = clide.makeGet('go/to/here', {
    validator: Function,
    Cache: 25251,
});