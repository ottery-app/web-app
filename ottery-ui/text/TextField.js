import { View } from "react-native";
import {useMemo} from "react"
import { Text } from "./Text";

function spacer(array) {
    const joinedArray = array.reduce((result, item, index) => {
      if (index < array.length - 1) {
        result.push(item, <Text> </Text>);
      } else {
        result.push(item);
      }
      return result;
    }, []);
    return joinedArray;
  }

export function TextField({children}) {
    const joined = useMemo(()=>spacer(children), [children]);

    return (
        <View style={{
            flex:1,
            flexDirection:"row"
        }}>
            {joined}
        </View>
    );
}