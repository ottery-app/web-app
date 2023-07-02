import { DummyCache } from "../ottery-cache/DummyCache";

export const CLIDE_CONF = {
    /**
     * how long the cashe will hold onto data responces for
     * @type {Cache}
     */
    cache: DummyCache,

    /**
     * these are the config properties for the cache
     * @type {Object}
     */
    cache_conf: undefined,

    /**
     * this is used to validate api params before they are attached to url
     * @type {{Function | isDuck | DuckDto}}
     */
    param_validators: {},

    /**
     * this is used to validate api data before it is sent
     * @type {Function | isDuck | DuckDto}
     */
    data_validator: undefined,

    /**
     * this is used to handle how Clide massages the user input before making a request with it
     * @param {*} props 
     */
    pipeline: props=>props
};