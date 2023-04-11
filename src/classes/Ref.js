export default class Ref {
    current = undefined;

    constructor(val) {
        this.current = val;
    }


    update(val) {
        this.current = val;
    }

    async awaitChange() {
        let current = this.current;

        let check = async () => {
            while (this.current === current){
                console.log("adsf");
            }
            return;
        }

        await check();
        return current;
    }
}