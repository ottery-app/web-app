import { StyleSheet } from "react-native"
import { ImageAsset } from "../../assets/ImageAsset"
import { View } from "react-native"
import Image from "../image/Image"
import { pfp } from "../../assets/icons"
import { image } from "../styles/image"
import { Avatar, List, Text } from "react-native-paper"
import { radius } from "../styles/radius"
import { margin } from "../styles/margin"
import { useThemeMaker } from "../styles/Color"
import { colors } from "../styles/colors"
import { border } from "../styles/border"

interface IconHeaderProps {
    src: ImageAsset, 
    title: string
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: margin.medium,
    }
})


export function IconHeader({
    src = pfp,
    title,
}: IconHeaderProps) {
    const pfpTheme = useThemeMaker({ primary: colors.tertiary });

    return (
        <List.Item
            left={(props) => (
                <Avatar.Image
                    {...props}
                    theme={pfpTheme}
                    source={{ uri: src.src }}
                />
            )}
            title={title}
            style={{
                borderBottomWidth: border.default,
                borderBottomColor: colors.background.secondary,
            }}
        />
    )
}