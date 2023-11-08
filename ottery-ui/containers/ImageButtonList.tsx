import { StyleSheet } from "react-native"
import { margin } from "../styles/margin"
import { Main } from "./Main";

export function ImageButtonList({children}) {
    return (
        <Main style={styles.main}>
            {children}
        </Main>
    );
}

const styles = StyleSheet.create({
    main: {
        display: "flex",
        gap: margin.medium,
    }
})