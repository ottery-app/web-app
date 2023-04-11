import { css, keyframes } from "styled-components";

export function makeAnimation(frame, time=1, func="linear", rep="infinite") {
    return ()=>css`
        animation:${frame} ${time}s ${func} ${rep};
        -webkit-animation:${frame} ${time}s ${func} ${rep};
        -moz-animation:${frame} ${time}s ${func} ${rep};
        -o-animation:${frame} ${time}s ${func} ${rep};
    `
}