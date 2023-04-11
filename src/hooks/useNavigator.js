import { useLocation, useNavigate } from "react-router-dom";
import { makeUrl } from "../router/navigate";
import paths from "../router/paths";
import { useSelector } from "react-redux";

const history = [];
let next;

export const IGNORENEXT = "ignore";

export function useNavigator() {
    const navigate = useNavigate();
    const state = useSelector(store=>store.auth.sesh.state);
    const {pathway} = useLocation();

    if (!history.length && pathway) {
        history.push(pathway);
    }

    return function navigator(dest, props) {
        let url;
        if (typeof dest  === "number") { //if they passed in a number they are using a back action
            //if we do not removed next it is very possible 
            //the user goes back and then the next link call
            //does nothing unless we remove it
            next = undefined;
            if (history.length === 0) {
                url = paths[state].home;
            } else {
                next = undefined;
                url = history.pop();
                for (let i = 0; i < (-1 * dest); i++) {
                    url = history.pop();
                }
            }
        } else {
            const ignoreNext = props && props.next === IGNORENEXT;
            if (ignoreNext) {
                delete props.next;
            }

            if (!ignoreNext && next) { //if there is a next option that takes precidence
                url = next;
                next = undefined;
            } else { //if there is no next option then we go to the given path
                if (props && props.next) {
                    next = props.next;
                    delete props.next;
                }
    
                url = makeUrl(dest, props);
            }
        }

        if (url) {
            history.push(url);
            navigate(url);
        }
    }
}