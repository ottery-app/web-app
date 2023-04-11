import React from "react";
import { useNavigator } from "../../hooks/useNavigator";
import paths from "../../router/paths";

export default function Website() {
    const navigator = useNavigator();

    React.useEffect(()=>{
        navigator(paths.auth.login);
    },[navigator]);

    return "website";
}