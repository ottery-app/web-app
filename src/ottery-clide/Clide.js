import axios, {AxiosInstance} from "axios";
import { CLIDE_CONF } from "./clide.conf";
import { isDuckDto, classifyWithDto, IdDto } from "ottery-dto";
import { TimeCache } from "../ottery-cache/TimeCache";
import { isId } from "ottery-dto";
import { makeUrl } from "../router/navigate";

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
     * @param {String} url 
     * @param {CLIDE_CONF} conf 
     * @returns 
     */
    makeRequest(url, conf={}) { 
        conf.url = url;
        conf = Object.assign({}, this.conf, conf);
        const cache = new conf.cache(conf.cache_conf);

        const that = this;
        return async function request(...props) {
            let config = conf.in_pipeline(...props);
            config = Object.assign({}, conf, config);

            function validateWith(validator, data) {
                try {
                    if (isDuckDto(validator)) {
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

            config.url = makeUrl(config.url, config.params);
            config.params = undefined;

            //make request
            let res;

            if (cache.get(config.url)) {
                res = cache.get(config.url);
            } else {
                res = await that.instance.request(config);
                cache.set(config.url, res);
            }

            return config.out_pipeline(res);
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

// const clideInst = new Clide({
//     baseURL: "http://localhost:8080/api/",
//     //this is longer due to some backend apis being long ones
//     timeout: 1000000,
//     cache: TimeCache,
// });

// const getChatsForHelper = clideInst.makeGet("message/user/:userId/:clientId", {
//     param_validators: {
//         userId: isId,
//     },
//     data_validator: IdDto,
// });

// getChatsForHelper({
//     params: {
//         userId: "userId",
//         clientId: "clientId",
//         tootId: "tootId",
//     },
//     data: {id:"id"}
// })