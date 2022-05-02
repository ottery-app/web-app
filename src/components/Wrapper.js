import { useContext } from 'react';

import Wrapping from './Wrapping';
import authContext from '../auth/authContext';

export default function Wrapper({children}) {
    const {isAuthenticated, client} = useContext(authContext);

    return (isAuthenticated) ? <Wrapping>{children}</Wrapping> : <>{children}</>;
}