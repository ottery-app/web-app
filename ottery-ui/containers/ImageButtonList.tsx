import { StyleSheet, View } from "react-native"
import { margin } from "../styles/margin"
import { Main } from "./Main";
import React from "react";

export function ImageButtonList({children}) {
    return (
        <View style={styles.main}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        padding: margin.medium,
        gap: margin.medium,
    }
})