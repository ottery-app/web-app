import { Main } from "../../../components/Main";
import Link from "../../../ottery-ui/text/Link";
import paths from "../../../router/paths";
import {useNavigator} from "../../../hooks/useNavigator";
import { useEffect } from "react";

export function FriendReqeust({notif, setCallback}) {
    const navigator = useNavigator();

    useEffect(()=>{
        setCallback(()=>()=>{
            navigator(paths.user.profile, {userId:notif.sender.id});
        })
    }, [notif]);

    return (
        <Main>
            <Link>
                {notif.message}
            </Link>
        </Main>
    );
}