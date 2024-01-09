import React from 'react';
import { Appbar, Menu, Text } from 'react-native-paper';
import { ThemeProvider } from '../../../ottery-ui/styles/Color';
import { logoDefault } from "../../../assets/logos";
import Image from "../../../ottery-ui/image/Image";
import { useAuthClient } from '../../features/auth/useAuthClient';
import { role } from '@ottery/ottery-dto';
import { colors } from '../../../ottery-ui/styles/colors';
import { margin } from '../../../ottery-ui/styles/margin';
import { useGotoNext } from '../useNavigator';
import { zindex } from '../../../ottery-ui/styles/zindex';

//gets set to true till the user restarts the app
let initialized = false;

export default function Header({
  navigation,
  back,
}) {
  const [visible, setVisible] = React.useState(false);
  const [menuFired, setMenuFired] = React.useState(Date.now());

  const openMenu = () => {
    setVisible(true);
    setMenuFired(Date.now());
  };
  const closeMenu = () => {
    if (Date.now() - menuFired > 400) setVisible(false)
  };
  const sesh = useAuthClient().useSesh();
  const logout = useAuthClient().useLogout();
  const gotoNext = useGotoNext();

  React.useEffect(()=>{
    if (initialized === false) {
      initialized = true;
      gotoNext();
    }
  }, []);

  return (
    <Appbar.Header
      //elevated={true}
      style={{
        //elevation:zindex.front,
        backgroundColor:(sesh.state === role.CARETAKER)?colors.success.main:colors.primary.main
      }}
    >
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title={<Image src={logoDefault} width={150}/>} />
        {(sesh.state === role.CARETAKER)?<Text style={{padding:margin.large}}>Clocked in</Text>:undefined}
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
  );
}