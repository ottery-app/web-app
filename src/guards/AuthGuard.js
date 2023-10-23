import { useSelector } from 'react-redux';
import paths from '../router/paths';
import { useStrategyGenerator } from './useStrategyGenerator';
import { Guard } from './Guard';
import { selectSesh } from '../features/auth/authSlice';
import { useNavigator } from '../router/useNavigator';
import { useAuthClient } from '../features/auth/useAuthClient';

export function AuthGuard({
    //the thing to display
    children,
    //GUARDS
    //force that the user is logged in
    loggedin,
    //force that the user is activated
    activated,
    //force that the user is notLoggedin
    notLoggedin,
    //force that they are in guardian state
    guardian,
    //force that they are in caretaker state
    caretaker,

    //this is used to trigger the hide instead of the breach
    hide,

    successHtml,
    errorHtml,
}) {
    //strats
    const [strategies, useStrategy] = useStrategyGenerator();
    const navigate = useNavigator();
    const {useSesh} = useAuthClient();
    const sesh = useSesh();

    console.warn("sesh is outdated for some reason?");

    //they keys arent really comments but they act as them since why not.
    useStrategy({
        key:        "must be loggedin",
        activate:   loggedin,
        shall:      true,
        get:        ()=>sesh.loggedin,
        breach:     ()=>navigate(paths.auth.login)
    });

    useStrategy({
        key:        "must be an activated account",
        activate:   activated,
        shall:      true,
        get:        ()=>sesh.activated,
        breach:     ()=>navigate(paths.auth.validate)
    });

    useStrategy({
        key:        "must not be loggedin",
        activate:   notLoggedin,
        shall:      false,
        get:        ()=>sesh.loggedin,
        breach:     ()=>navigate(paths.auth.validate)
    });

    useStrategy({
        key:        "must be in guardian state",
        activate:   guardian,
        shall:      "guardian",
        get:        ()=>sesh.state,
        breach:     ()=>navigate(paths.main.home)
    });

    useStrategy({
        key:        "must be in caretaker state",
        activate:   caretaker,
        shall:      "caretaker",
        get:        ()=>sesh.state,
        breach:     ()=>navigate(paths.main.home)
    });
    

    return (
        <Guard
            strategies={strategies}
            hide={hide}
            successHtml={successHtml}
            errorHtml={errorHtml}
        >
            {children}
        </Guard>
    );
}