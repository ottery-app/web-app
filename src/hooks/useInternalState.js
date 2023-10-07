import { useEffect } from "react";
import { useState } from "react";

/**
 * this is used to make a state for one of the prop inputs
 */
export function useInternalState(state) {
    const [internalState, setState] = useState(state);

    useEffect(()=>{
        setState(state);
    }, [state]);

    return [internalState, setState];
}