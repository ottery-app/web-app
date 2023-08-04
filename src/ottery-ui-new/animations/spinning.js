import { keyframes } from "styled-components";
import { makeAnimation } from "./makeAnimation";

export const spinFrame = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const spinFast = makeAnimation(spinFrame);
export const spinMedium = makeAnimation(spinFrame, 2)
export const spinSlow = makeAnimation(spinFrame, 3);