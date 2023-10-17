import {View} from "react-native";
import { margin } from "../../../ottery-ui/styles/margin";

export const Main = ({children}) => (
    <View style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
      maxWidth: 500,
      width: '100%',
    }}>
      {children}
    </View>
);

export const Form = ({children}) => (
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: "100%",
      rowGap: margin.medium,
    }}>
      {children}
    </View>
  );