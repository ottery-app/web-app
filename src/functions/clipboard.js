import { Ping } from "../ottery-ping/Ping";

export function copyText(text, successText, errorText) {
    console.log(text, successText, errorText);
    navigator.clipboard.writeText(text).then(()=>{
        successText && Ping.alert(successText);
    }, (err)=>{
        errorText && Ping.warn(errorText);
    });
}