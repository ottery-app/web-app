export class Ping {
    static error(msg, options) {
        console.error(msg);
        window.alert(msg);
    }

    static warn(msg, options) {
        console.warn(msg);
        window.alert(msg);
    }

    static alert(msg, options) {
        console.log(msg);
        window.alert(msg);
    }
}