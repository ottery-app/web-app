import { Main } from "../../../components/Main";
import Link from "../../../ottery-ui/text/Link";
import paths from "../../../router/paths";
import {useNavigator} from "../../../hooks/useNavigator";

export function FriendReqeust({notif}) {
    const navigator = useNavigator();

    return (
        <Main>
            <Link onClick={()=>{
                navigator(paths.user.profile, {userId:notif.sender.id})
            }}>
                {notif.message}
            </Link>
        </Main>
    );
}