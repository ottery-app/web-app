import { Cache } from "./Cache";

/**
 * literally does nothing just used if you want code to run with the cache interface without the interface doing anything
 */
export class DummyCache extends Cache {
    constructor() {
        super();
    }

    set(id, value) {
        return this;
    }
}