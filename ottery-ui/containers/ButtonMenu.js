import { View, StyleSheet } from "react-native";
import { margin } from "../styles/margin";
import { useState } from "react";
import { IconButton } from "../buttons/IconButton";

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

const styles = StyleSheet.create({
    grid: {
        flex: 2,
        gap: margin.small,
        flexDirection: 'row', // Arrange buttons in a row
        flexWrap: 'wrap', // Wrap to the next line when there's not enough space
        //alignItems:"center",
        //justifyContent:"center",
        // backgroundColor:"red"
    }
});