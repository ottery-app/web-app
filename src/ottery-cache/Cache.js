import { CacheEntry } from "./CacheEntry";

export class Cache extends Map {
    constructor() {
        super();
    }

    set(id, value) {
        const entry = new CacheEntry(id, value);
        return super.set(id, entry);
    }

    async retrieveUsing(id, retriever) {
        let res = this.get(id);

        if (!res) {
            res = await retriever();
            this.set(id, res);
        }

        return res;
    } 
}