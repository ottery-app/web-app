import React from 'react';
import { Appbar, Menu, Text } from 'react-native-paper';
import { ThemeProvider } from '../../../ottery-ui/styles/Color';
import { logoDefault } from "../../../assets/logos";
import Image from "../../../ottery-ui/image/Image";
import { useAuthClient } from '../../features/auth/useAuthClient';
import { role } from '@ottery/ottery-dto';

export default function Header({
  navigation,
  back,
}) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const sesh = useAuthClient().useSesh();
  const logout = useAuthClient().useLogout();

  console.log(sesh);

  return (
    <ThemeProvider>
        <Appbar.Header style={{backgroundColor:"green"}}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={<Image src={logoDefault} width={150}/>} />
            {(sesh.state !== role.CARETAKER)?<Text>Clocked in</Text>:undefined}
            {!back ? (
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action
                        icon="dots-vertical"
                        onPress={openMenu}
                        />
                    }
                >
                <Menu.Item
                    onPress={() => {logout.mutate()}}
                    title="Logout"
                />
                </Menu>
            ) : null}
        </Appbar.Header>
    </ThemeProvider>
  );
}