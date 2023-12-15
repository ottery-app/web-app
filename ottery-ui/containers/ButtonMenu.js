import { View, StyleSheet } from "react-native";
import { margin } from "../styles/margin";
import { useState } from "react";
import { IconButton } from "../buttons/IconButton";
import { useWindowDimensions } from "../../src/hooks/dimentions.hook";

//button = {title, onPress, icon}
export function ButtonMenu({buttons = []}) {
    const {width} = useWindowDimensions();

    return (
        <View 
            style={styles.grid}
        >
            {buttons.map(button=>
                <View>
                    <IconButton 
                        width={width / 2 - margin.large}
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

const styles = StyleSheet.create({
    grid: {
        //flex: 2,
        gap: margin.small,
        flexDirection: 'row', // Arrange buttons in a row
        flexWrap: 'wrap', // Wrap to the next line when there's not enough space
        justifyContent:"center",
    }
});