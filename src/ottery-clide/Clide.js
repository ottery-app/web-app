import axios, {AxiosInstance} from "axios";
import { CLIDE_CONF } from "./clide.conf";
import { isDuckDto, classifyWithDto } from "@ottery/ottery-dto";
import { makeUrl } from "../router/navigate";
// import { v4 as guid } from 'uuid';

/**
 * this is a porting of axios with a few extra features to better support the needs of ottery
 */
export class Clide {
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
                    if (isDuckDto(validator)) {
                        console.log("true");
                        classifyWithDto(validator, data, {throw: true})
                    } else {
                        console.log(validator);
                        validator(data, {throw: true});
                    }
                } catch (e) {
                    console.error(e);
                    //throw e;
                }
            }

            //validate data
            if (config.data_validator) {
                console.warn("data_validator is currently disabled due to ducktyper problems");
                validateWith(config.data_validator, config.data);
            }

            //validate params
            for (let key in config.param_validators) {
                console.warn("param_validator is currently disabled due to ducktyper problems");
                validateWith(config.param_validators[key], config.params[key]);
            }

            //need to store to reattach so that the request params dont get ruined and then
            //the config pass through still has the needed info
            const oldParams = config.params;
            config.url = makeUrl(config.url, config.params);
            config.params = undefined;

            //make request
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