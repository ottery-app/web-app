import { useParams } from "react-router-dom";
import { useState } from "react";
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
    const {data: userRes} = useGetUserInfo({inputs:[userId]});
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

    if (selfId === userId) {
        return <UserSelf {...data}/>
    } else if (userId) {
        return <UserOther {...data}/>
    } else {
        return null;
    }
}