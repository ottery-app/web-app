import { View } from "react-native";
import { Text } from "react-native-paper";
import Button from "./Button";

export function SettingsOption({
    onPress,
    children,
    buttonTitle="View",
}) {
    return <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }}
    >
        <Text>{children}</Text>
        <Button onPress={onPress}>{buttonTitle}</Button>
    </View>
}