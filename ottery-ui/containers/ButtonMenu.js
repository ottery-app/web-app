import { View, StyleSheet } from "react-native";
import Button from "../buttons/Button";
import { colors } from "../styles/colors";
import { margin } from "../styles/margin";
import { useState } from "react";
import { Icon, Text } from "react-native-paper";
import { SquareIconButton } from "../buttons/SquareIconButton";

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
                    <SquareIconButton 
                        width={width}
                        key={button.title}
                        onPress={button.onPress}
                        icon={button.icon}
                    >
                        {button.title}
                    </SquareIconButton>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flex: 1,
        gap: margin.small,
        flexDirection: 'row', // Arrange buttons in a row
        flexWrap: 'wrap', // Wrap to the next line when there's not enough space
    },
});