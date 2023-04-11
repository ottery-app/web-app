import { useState } from "react";

export function useRerenderer() {
    const [toggle, setToggle] = useState(false);

    return function rerender() {
        setToggle(!toggle);
    }
}