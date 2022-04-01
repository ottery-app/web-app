import Guardian from './Guardian';

/** this is the path to the backend */
const backend = "http://localhost:8080";

/** these are the states that a user can be in */
const userStates = new Map();
userStates.set("guardian", Guardian);

/**
 * this function is used to set the default success and falre callbacks
 * @param {function} success what to do on success
 * @param {function} error what to do on error
 * @returns {array} [success, error] if the inputs are null they will be updated to the default functions
 */
function setDefaults(success, error) {
    if(!success) {
        success = (res)=>{console.log(res)};
    }

    if(!error) {
        error = (err)=>{console.log(err)}
    }

    return [success, error];
}

export {
    backend,
    userStates,
    setDefaults,
}