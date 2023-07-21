import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import paths from '../router/paths';
import { useNavigator } from '../hooks/useNavigator';
import { useStrategyGenerator } from './useStrategyGenerator';
import { Guard } from './Guard';

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

    //wait for this function to finish.
    after,

    successHtml,
    errorHtml,
}) {
    //strats
    const [strategies, useStrategy] = useStrategyGenerator();

    //contracts
    const navigator = useNavigator();
    const {pathname} = useLocation();
    const sesh = useSelector(store=>store.auth.sesh);

    //they keys arent really comments but they act as them since why not.
    useStrategy({
        key:        "must be loggedin",
        activate:   loggedin,
        shall:      true,
        get:        ()=>sesh.loggedin,
        breach:     ()=>navigator(paths.auth.login, {next:pathname})
    });

    useStrategy({
        key:        "must be an activated account",
        activate:   activated,
        shall:      true,
        get:        ()=>sesh.activated,
        breach:     ()=>navigator(paths.auth.validate, {next:pathname})
    });

    useStrategy({
        key:        "must not be loggedin",
        activate:   notLoggedin,
        shall:      false,
        get:        ()=>sesh.activated,
        breach:     ()=>navigator(paths[sesh.state].home, {next:pathname})
    });

    useStrategy({
        key:        "must be in guardian state",
        activate:   guardian,
        shall:      "guardian",
        get:        ()=>sesh.state,
        breach:     ()=>navigator(paths[sesh.state].home, {next:pathname})
    });

    useStrategy({
        key:        "must be in caretaker state",
        activate:   caretaker,
        shall:      "caretaker",
        get:        ()=>sesh.state,
        breach:     ()=>navigator(paths[sesh.state].home, {next:pathname})
    });
    

    return (
        <Guard
            strategies={strategies}
            hide={hide}
            after={after}
            successHtml={successHtml}
            errorHtml={errorHtml}
        >
            {children}
        </Guard>
    );
}