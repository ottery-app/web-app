import { View, StyleSheet } from "react-native";
import Button from "../buttons/Button";
import { colors } from "../styles/colors";
import { margin } from "../styles/margin";
import { useState } from "react";
import { Icon, Text } from "react-native-paper";

//button = {title, onPress, icon}
export function ButtonMenu({buttons = []}) {
    const [width, setWidth] = useState(0);

    return (
        <View 
            onLayout={({nativeEvent})=>{setWidth(nativeEvent.layout.width / 2 - margin.small/1.9)}}
            style={styles.grid}
        >
            {buttons.map(button=>
                <View>
                    <IconButton 
                        width={width}
                        key={button.title}
                        onPress={button.onPress}
                        icon={button.icon}
                    >
                        {button.title}
                    </IconButton>
                </View>
            )}
        </View>
    );
}

function IconButton({icon, width, onPress, children}) {
    const MAX_SIZE = 200;
    const ICON_SCALE = 0.5;

    return (
        <Button
            color={colors.secondary}
            onPress={onPress}
            width={width}
            height={width}
            maxHeight={MAX_SIZE}
            maxWidth={MAX_SIZE}
            shadow
        >
            <View style={styles.innerButton}>
                <Icon
                    source={icon}
                    size={(width <= MAX_SIZE) ? width * ICON_SCALE : MAX_SIZE * ICON_SCALE}
                />
                <Text variant={"titleMedium"} style={{fontWeight:"bold"}}>{children}</Text>
            </View>
        </Button>
    )
}

const styles = StyleSheet.create({
    grid: {
        flex: 1,
        gap: margin.small,
        flexDirection: 'row', // Arrange buttons in a row
        flexWrap: 'wrap', // Wrap to the next line when there's not enough space
    },
    innerButton: {
        alignItems: "center",
    }
});