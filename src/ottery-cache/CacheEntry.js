export class CacheEntry {
    creation;
    accessed;
    value;
    id;

    constructor(id, value) {
        this.creation = new Date().getTime();
        this.accessed = new Date().getTime();
        this.value = value;
        this.id = id;
    }

    get lifespan() {
        return new Date().getTime() - this.creation;
    }

    use() {
        this.accessed = new Date().getTime();
        return this.value;
    }
}
