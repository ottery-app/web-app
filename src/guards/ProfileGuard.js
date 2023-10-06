import { useSelector } from 'react-redux';
import { useStrategyGenerator } from './useStrategyGenerator';
import { Guard } from './Guard';
import { socialLinkState } from 'ottery-dto';
import { friendStatus } from '../features/social/socialApi';
import { useParams } from 'react-router-dom';
import paths from '../router/paths';


export function ProfileGuard({
    //the thing to display
    children,

    //GUARDS
    //this forces that the page is this user
    user, //set as user ID

    //this forces that the page is not the user
    notUser, //set as user ID

    //checks if the user is following
    isFollowing, //set as userId

    //checks if the user is following this person
    isNotFollowing, //set as userID

    //this is for checking if they are waiting for the user to accept a follow request
    isFollowReqeusted,

    //this is used to check if they are the last person to send the activation
    isActivator,

    //used to check if this is not the person to send the activation
    isNotActivator,

    //HIDE
    //this is used to trigger the hide instead of the breach
    hide,

    successHtml,
    failHtml,
}) {
    //strats
    const [strategies, useStrategy] = useStrategyGenerator();

    //contracts
    const sesh = useSelector(store=>store.auth.sesh);

    //Other
    const {userId} = useParams();

    //they keys arent really comments but they act as them since why not.
    useStrategy({
        key:        "must be user",
        activate:   !!user,
        shall:      user,
        get:        ()=>sesh.userId,
        breach:     ()=>{console.error("this should be used with hide")}
    });

    useStrategy({
        key:        "must be not user",
        activate:   !!notUser,
        shall:      true,
        get:        ()=>sesh.userId !== notUser,
        breach:     ()=>{console.error("this should be used with hide")}
    });

    useStrategy({
        key:        "must be folowing user",
        activate:   !!isFollowing,
        shall:      socialLinkState.ACCEPTED,
        get:        async ()=>{
                        if (typeof isFollowing === typeof true) {
                            isFollowing = userId;
                        }
                        
                        return (await friendStatus(isFollowing)).data.state.state;
                    },
        breach:     ()=>{navigator(paths[sesh.state].home)}
    });

    useStrategy({
        key:        "must not be folowing user",
        activate:   !!isNotFollowing,
        shall:      socialLinkState.NONE,
        get:        async ()=>{
                        if (typeof isNotFollowing === typeof true) {
                            isNotFollowing = userId;
                        }

                        return (await friendStatus(isNotFollowing)).data.state.state;
                    },
        breach:     ()=>{navigator(paths[sesh.state].home)}
    });

    useStrategy({
        key:        "must be awaiting the follow request to be accepted",
        activate:   !!isFollowReqeusted,
        shall:      socialLinkState.REQUESTED,
        get:        async ()=>{
                        return (await friendStatus(isFollowReqeusted)).data.state.state;
                    },
        breach:     ()=>{console.error("this should be used with hide")}
    });

    useStrategy({
        key:        "used to check if they are the activator of the last friend request",
        activate:   !!isActivator,
        shall:      isActivator,
        get:        async ()=>{
                        return (await friendStatus(isActivator)).data.state.activator;
                    },
        breach:     ()=>{console.error("this should be used with hide")}
    })

    useStrategy({
        key:        "used to check if they are not the activator of the last friend request",
        activate:   !!isNotActivator,
        shall:      false,
        get:        async ()=>{
                        return isNotActivator === (await friendStatus(isNotActivator)).data.state.activator;
                    },
        breach:     ()=>{console.error("this should be used with hide")}      
    })

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