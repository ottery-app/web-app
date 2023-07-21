import { useStrategyGenerator } from './useStrategyGenerator';
import { Guard } from './Guard';
import { getEvents } from '../features/user/userApi';
import { useUserId } from '../hooks/useUserId';

export function EventGuard({
    //the thing to display
    children,

    //GUARDS
    isRegistered, //set as event ID

    isNotRegistered, //set as event ID

    //HIDE
    //this is used to trigger the hide instead of the breach
    hide,

    //wait for this function to finish.
    after,

    successHtml,
    errorHtml,
}) {
    //strats
    const [strategies, useStrategy] = useStrategyGenerator();
    const userId = useUserId();

    async function checkIfActiveUserIsRegistered(eventId) {
        if (!userId) {
            return false;
        }
        
        const res = await getEvents(userId);

        for (let i = 0 ; i < res.data.length; i++) {

            if (res.data[i]._id === eventId) {
                return true;
            }
        }

        return false;
    }

    //they keys arent really comments but they act as them since why not.
    useStrategy({
        key:        "must be registeed for the event",
        activate:   !!isRegistered,
        shall:      true,
        get:        async ()=>{
                        const res = await checkIfActiveUserIsRegistered(isRegistered);
                        console.log(res);
                        return res;
                    },
        breach:     ()=>{console.error("this should be used with hide")}
    });

    useStrategy({
        key:        "must not be registeed for the event",
        activate:   !!isNotRegistered,
        shall:      false,
        get:        async ()=>{
                        return await checkIfActiveUserIsRegistered(isNotRegistered);
                    },
        breach:     ()=>{console.error("this should be used with hide")}
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