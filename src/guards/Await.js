import { useEffect, useState } from "react";
import Image from "../ottery-ui/images/Image";
import { roundOtterFullBody } from "../assets/images/otters";

export function Await({after, children}) {
    const [disp, setDisp] = useState(false);

    useEffect(()=>{
        (async ()=>{
            if (after) {
                await after();
                setDisp(true);
            }
        })()
    }, []);

    return !after || disp ? children : <Image 
        src={roundOtterFullBody}
        width={"100%"}
        animation={"spin"}
    />;
}