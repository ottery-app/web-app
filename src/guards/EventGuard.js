import { useStrategyGenerator } from './useStrategyGenerator';
import { Guard } from './Guard';
import { getEvents } from '../features/user/userApi';
import { useAuthClient } from '../features/auth/useAuthClient';

export function EventGuard({
    //the thing to display
    children,

    //GUARDS
    isRegistered, //set as event ID

    isNotRegistered, //set as event ID

    //HIDE
    //this is used to trigger the hide instead of the breach
    hide,

    successHtml,
    failHtml,
}) {
    //strats
    const [strategies, useStrategy] = useStrategyGenerator();
    const {useUserId} = useAuthClient()
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
                        return res;
                    },
    });

    useStrategy({
        key:        "must not be registeed for the event",
        activate:   !!isNotRegistered,
        shall:      false,
        get:        async ()=>{
                        return await checkIfActiveUserIsRegistered(isNotRegistered);
                    },
    });

    return (
        <Guard
            strategies={strategies}
            hide={hide}
            successHtml={successHtml}
            failHtml={failHtml}
        >
            {children}
        </Guard>
    );
}