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
     * this is used to validate api input before it is sent
     * @type {Function | isDuck | DuckDto}
     */
    validator: undefined,
};