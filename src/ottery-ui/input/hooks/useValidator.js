import { useRef, useState, setTimeout, useEffect, useMemo } from "react";

export function makeValidator(state) {
    return ()=>{
        if (state === "error") {
            return false;
        } else if (state === "success") {
            return true;
        } else {
            return;
        }
    }
}

export default function useValidator(validator, value, delay=1000) {
    const timeout = useRef(null);
    const [status, setStatus] = useState("default");

    useEffect(() => {
        clearTimeout(timeout.current);

        timeout.current = window.setTimeout(() => {
            if (validator) {
                if (value) {
                    if (validator(value) === true) {
                        setStatus("success");
                    } else if (validator(value) === false) {
                        setStatus("error");
                    } else {
                        setStatus("default");
                    }
                } else {
                    setStatus("default");
                }
            }
        }, delay);
    },[value]);

    return status;
}