import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserSelf from "./Self";
import UserOther from "./Other";
import { useAuthClient } from "../../auth/useAuthClient";
import {useUserClient} from "../useUserClient";

export default function User() {
    const {userId} = useParams();
    const {useUserId} = useAuthClient()
    const selfId = useUserId();
    const [toggle, setToggle] = useState(false);
    const {useGetUserInfo} = useUserClient();
    const {data: userRes, status} = useGetUserInfo({inputs:[userId]});
    const userInfo = userRes?.data[0];

    function render() {
        setToggle(!toggle);
    }

    const data = {
        userId: userId,
        selfId: selfId,
        userInfo:userInfo,
        reRender: render,
    }

    let body;
    if (selfId === userId) {
        return <UserSelf {...data}/>
    } else {
        return <UserOther {...data}/>
    }
}