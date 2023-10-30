import axios, {AxiosInstance} from "axios";
import { CLIDE_CONF } from "./clide.conf";
import { isDto, classifyWithDto } from "@ottery/ottery-dto";

/**
 * this is a porting of axios with a few extra features to better support the needs of ottery
 */
export default class Clide {
    /**
     * this is the instance that is used to handle clides requests
     * @type {AxiosInstance}
     */
    instance;

    /**
     * these are the current instance configurations
     * @type {*}
     */
    conf

    constructor(conf={}) {
        conf = Object.assign({}, CLIDE_CONF, conf);
        this.conf = conf;
        this.instance = axios.create(conf);
    }

    /**
     * gets the defaults of the axios instance as though it was Clides defaults
     */
    get defaults() {
        return this.instance.defaults;
    }

    /**
     * @param {String} url 
     * @param {CLIDE_CONF} conf 
     * @returns 
     */
    makeRequest(url, conf={}) { 
        conf.url = url;
        conf = Object.assign({}, this.conf, conf);

        const that = this;
        return async function request(...props) {
            let config = await conf.in_pipeline(...props);
            config = Object.assign({}, conf, config);

            function validateWith(validator, data) {
                try {
                    if (isDto(validator)) {
                        classifyWithDto(validator, data, {throw: true})
                    } else {
                        validator(data, {throw: true});
                    }
                } catch (e) {
                    throw e;
                }
            }

            //validate data
            if (config.data_validator) {
                validateWith(config.data_validator, config.data);
            }

            //validate params
            for (let key in config.param_validators) {
                validateWith(config.param_validators[key], config.params[key]);
            }

            const oldParams = config.params;
            config.url = makeUrl(config.url, config.params);
            config.params = undefined;

            let res = await that.instance.request(config);

            config.params = oldParams;
            return await config.out_pipeline(res, config);
        }
    }

    makeGet(url, conf={}) {
        conf.method = 'get';
        return this.makeRequest(url, conf);
    }

    makeDelete(url, conf={}) {
        conf.method = 'delete';
        return this.makeRequest(url, conf);
    }

    makePost(url, conf={}) {
        conf.method = 'post';
        return this.makeRequest(url, conf);
    }

    makePut(url, conf={}) {
        conf.method = 'put';
        return this.makeRequest(url, conf);
    }

    makePatch(url, conf={}) {
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

function makeUrl(dest, props) {
    if (props) {
        let url = dest;
        let tail = "?";

        Object.entries(props).forEach((arr)=>{
            if (arr[1]) {
                if (url.indexOf(":" + arr[0]) === -1) {
                    if (Array.isArray(arr[1])) {
                        for (let i in arr[1]) {
                            tail = tail + arr[0] + "[]=" + arr[1][i] + "&";
                        }
                    } else {
                        tail = tail + arr[0] + "=" + arr[1] + "&";
                    }
                } else {
                    url = url.replaceAll(":" + arr[0], arr[1]);
                }
            }
        });

        return url + ((tail.length > 1) ? tail.slice(0, -1) : "");
    } else {
        return dest;
    }
}