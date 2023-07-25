import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as UserApi from "../userApi";
import { Ping } from "../../../ottery-ping/Ping";
import UserSelf from "./Self";
import UserOther from "./Other";
import { useAuthClient } from "../../auth/useAuthClient";

export default function User() {
    const {userId} = useParams();
    const {useUserId} = useAuthClient()
    const selfId = useUserId();
    const [toggle, setToggle] = useState(false);
    const [userInfo, setUserInfo] = useState();

    function render() {
        setToggle(!toggle);
    }

    async function loadUserData(userId) {
        return (await UserApi.getInfo(userId)).data[0];
    }

    useEffect(()=>{
        if (userId) {
            loadUserData(userId)
                .then(res=>{
                    setUserInfo(res);
                })
                .catch(err=>{
                    Ping.error(err.message);
                })
        }
    },[userId]);

    const data = {
        userId: userId,
        selfId: selfId,
        userInfo:userInfo,
        reRender: render,
    }

    if (selfId === userId) {
        return <UserSelf {...data}/>
    } else {
        return <UserOther {...data}/>
    }
}