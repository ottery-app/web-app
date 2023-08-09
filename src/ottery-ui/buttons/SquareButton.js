import Button from "./Button";
import { colors } from "../styles/colors";
import { clickable } from "../styles/clickable";
import useColors from "../hooks/useColors";

export default function SquareButton(props, {
    color=colors.secondary,
    height=clickable.maxHeight,
}) {
    color = useColors({color})
    return (
        <Button 
            height = {height}
            color={color}
            {...props}
        >{props.children}</Button>
    );
}