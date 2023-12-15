import { margin } from "../styles/margin"
import { Main } from "./Main";
import React from "react";

export function ImageButtonList({children}) {
    return (
        <Main scrollable={true} style={{gap:margin.medium}}>
            {children}
        </Main>
    );
}