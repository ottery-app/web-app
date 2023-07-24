export const API_ENV = {
    /**
     * this is the time between query requests
     * @type {Number}
     */
    query_delta: 5000,

    /**
     * how long before the request times out
     * @type {Number}
     */
    timeout: 100000000000,

    paths: {
        auth: {
            base: "auth",
            load: "auth/load",
            login: "auth/login",
            logout: "auth/logout",
            register: "auth/register",
            activate: "auth/activate",
            resend: "auth/resend",
            state: {
                switch: "auth/state/switch",
            }
        },
    }
};