import { useState } from "react";
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { InputIconWrapper } from "./InputIconWrapper";


export interface InfoWrapperProps {
    children: any,
    header: string,
    info: string,
}

export function InfoWrapper({children, header, info}) {
    const [display, setDisplay] = useState(false);

    const showDialog = () => setDisplay(true);

    const hideDialog = () => setDisplay(false);

    return (
        <>
            <Portal>
                <Dialog visible={display} onDismiss={hideDialog}>
                    <Dialog.Title>{header}</Dialog.Title>
                    <Dialog.Content>
                    <Text variant="bodyMedium">{info}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={hideDialog}>Got it!</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <InputIconWrapper icon={info} onPress={showDialog}>
                {children}
            </InputIconWrapper>
        </>
    );
}