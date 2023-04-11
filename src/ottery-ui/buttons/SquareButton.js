import Button from "./Button";
import { colors } from "../styles/colors";
import { clickable } from "../styles/clickable";

export default function SquareButton(props, {
    primaryColor=colors.tertiary,
    secondaryColor=colors.textDark,
    primaryTextColor=colors.textDark,
    height=clickable.maxHeight,
}) {
    return (
        <Button 
            height = {height}
            primaryColor = {primaryColor}
            secondaryColor = {secondaryColor}
            primaryTextColor = {primaryTextColor}
            {...props}
        >{props.children}</Button>
    );
}