import {View} from "react-native";
import { margin } from "../../../ottery-ui/styles/margin";

export const Main = ({children}) => (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <View>
        {children}
      </View>
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