import React from "react";
import { Link as LinkMui} from "@mui/material";

/**
 * 
 * @param id is the id of the link
 * @param className is the name of any classes attached to the link
 * @param children are the contents of the link
 * @param href is the destination of the link
 * @param onClick is the on click callback 
 */
export function Link({
    children,
    href,
    onClick,
}) {
    return (
        <LinkMui
            onClick={onClick}
            href={href}
        >
            {children}
        </LinkMui>
    )
}