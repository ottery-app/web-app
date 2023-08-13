import styled from 'styled-components'
import Input from '../input/Input'
import IconButton, { ICON_NAMES } from '../buttons/IconButton';
import { useState } from 'react';
import { margin } from '../styles/margin';

const Main = styled.div`
    display: flex;
    width: 100%;
    gap: ${margin.medium};
`;

export function MessageInput({onSend}) {
    const [message, setMessage] = useState('');

    return <Main>
        <Input 
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
        />

        <IconButton
            onClick={()=>{
                setMessage('');
                onSend(message);
            }}
            icon={ICON_NAMES.send}
        />
    </Main>
}