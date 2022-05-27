export default class Url {
    constructor(url) {
        this.url = url;
    }
    
    get id() {
        return this.url.split('id=')[1];
    }
}