import { useDispatch, useSelector} from "react-redux";
import { switchState } from "../features/auth/authSlice";
import paths from "../router/paths";
import { useNavigator } from "./useNavigator";

//I dont really like this
export default function useSwapState(options = {
    goHome:true,
}) {
    const dispatch = useDispatch();
    const navigator = useNavigator();
    const state = useSelector(store=>store.auth.sesh.state);

    return [state, (eventID)=>{
        dispatch(switchState(eventID)).then((res)=>{
            options.goHome && navigator(paths[res.payload.state].home);
        });
    }]
}