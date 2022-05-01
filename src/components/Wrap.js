import { useContext } from 'react';

import Wrapper from './Wrapper';
import authContext from '../auth/authContext';

export default function Wrap({children}) {
    const {isAuthenticated, client} = useContext(authContext);

    return (isAuthenticated) ? <Wrapper>{children}</Wrapper> : <>{children}</>;
}