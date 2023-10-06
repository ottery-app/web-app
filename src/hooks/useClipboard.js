import { usePing } from "../ottery-ping";

export function useClipboard() {
    const Ping = usePing();

    return function copyText(text, successText="Coppied to clipboard", errorText="Failed to coppy to clipboard") {
        navigator.clipboard.writeText(text).then(()=>{
            successText && Ping.alert(successText);
        }, (err)=>{
            errorText && Ping.warn(errorText);
        });
    }
}