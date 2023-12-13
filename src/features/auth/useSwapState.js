import { useDispatch, useSelector} from "react-redux";
import { switchState } from "./authSlice";
import paths from "../../router/paths";
import { useNavigator } from "../../router/useNavigator";
import { usePing } from "../../../ottery-ping";

//I dont really like this
export default function useSwapState(options = {
    goHome:true,
}) {
    const dispatch = useDispatch();
    const navigator = useNavigator();
    const state = useSelector(store=>store.auth.sesh.state);
    const Ping = usePing();

    return [state, (eventID)=>{
        dispatch(switchState(eventID)).then((res)=>{
            if (!res.error) {
                options.goHome && navigator(paths.main.home);
            } else {
                Ping.error("Unable to clock in at this time")
            }
        });
    }]
}