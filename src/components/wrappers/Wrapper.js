import { useContext, useEffect, useState } from 'react';

import NavWrap from './MainWrap';
import authContext from '../../auth/authContext';

export default function Wrapper({children}) {
    const [state, setState] = useState();
    const {isAuthenticated, client} = useContext(authContext);

    useEffect(()=>{
        if (isAuthenticated) {
            client.user.info(
                (res)=>{
                    setState(res.data.user.userState)},
                (e)=>{console.log(e)}
            )
        }
    }, [client])

    return (isAuthenticated) ? <NavWrap state={state}>{children}</NavWrap> : <>{children}</>;
}