import { useContext } from 'react';

import NavWrap from './MainWrap';
import authContext from '../../auth/authContext';

export default function Wrapper({children}) {
    const {isAuthenticated, client} = useContext(authContext);

    return (isAuthenticated) ? <NavWrap state={client.state}>{children}</NavWrap> : <>{children}</>;
}