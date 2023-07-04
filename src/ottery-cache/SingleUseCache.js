import { Cache } from "./Cache";

export class SingleUseCache extends Cache {
    constructor() {
        super()
    }

    get(id) {
        let value = super.get(id);
        this.delete(id);
        return value?.use();
    }

    async retrieveUsing(id, retriever) {
        let res = this.get(id);

        const getNset = async ()=>{
            res = await retriever();
            this.set(id, res);
            return res;
        }

        if (res) {
            (async ()=>{
                await getNset();
            })()
        } else {
            res = await getNset(); 
        }

        return res;
    }
}