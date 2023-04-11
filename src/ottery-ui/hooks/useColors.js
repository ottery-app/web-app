import { useMemo } from "react";
import colorPipe from "../functions/colorPipe";

export default function useColors({
    status,
    primaryColor,
    secondaryColor,
    primaryTextColor,
}) {
    return useMemo(()=>{
        const colors = colorPipe({
            primaryColor,
            secondaryColor,
            primaryTextColor,
        }, status);
        return colors;
    }, [status, primaryColor, secondaryColor, primaryTextColor]);
}