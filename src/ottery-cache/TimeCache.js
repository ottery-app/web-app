import { CacheEntry } from "./CacheEntry";
import { Cache } from "./Cache";

export class TimeCache extends Cache {
    /**
     * the time an entry is permitted to stay
     * @type {Number}
     */
    lifespan;

    constructor(config) {
        super();
        this.lifespan = config?.lifespan || 1000 * 60 * 60; //1 hour
    }

    set(id, value) {
        const entry = new CacheEntry(id, value);
        super.set(id, entry);

        entry.__timeCach_timeout = setTimeout(()=>{
            super.delete(id);
        }, this.lifespan);
    }

    get(id) {
        let entry = super.get(id);
        return entry?.use();
    }

    delete(id) {
        let entry = super.get(id);
        clearTimeout(entry.__timeCach_timeout);
        return super.delete(id);
    }
}