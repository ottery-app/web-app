import React from "react";
import Header from "../components/Header";
import NavBar from "./NavBar";

export default function Wrap({children, title}) {
    return(
        <>
            <Header title={title}/>
                {children}
            <NavBar />
        </>
    );
}