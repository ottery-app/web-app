import React from "react";
import Header from "../components/Header";
import NavBar from "./NavBar";
import { AwaitGlobalLoad } from "../guards/AwaitLoadGlobal";

export default function Wrap({children, title}) {
    return(
        <>
            <Header title={title}/>
                <AwaitGlobalLoad>
                    {children}
                </AwaitGlobalLoad>
            <NavBar />
        </>
    );
}