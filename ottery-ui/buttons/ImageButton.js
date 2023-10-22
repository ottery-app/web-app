import Image from "../image/Image";
import { Color } from "../styles/Color";
import { radius as rad } from "../styles/radius";
import {useMemo} from "react"
import {View, StyleSheet} from "react-native"
import Button from "./Button";
import { colors } from "../styles/colors";
import { check, x } from "../../assets/icons";
import { clickable } from "../styles/clickable";
import { BUTTON_STATES } from "./button.enum";

// const Container = styled(View)`
//     display: flex;
//     grid-template-columns: ${clickable.minHeight} auto ${clickable.minHeight};
//     align-items: center;
//     min-height: ${clickable.minHeight};
// `

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        width: "100%",
    }
})

export function ImageButton({
  left,
  right,
  children,
  color = colors.secondary,
  radius = rad.round,
  state,
  onClick,
}) {
    const leftImage = useMemo(()=>{
        if (left) {
            return <Image height={clickable.minHeight} src={left} />
        }

        if (state === BUTTON_STATES.error) {
            return <Image height={clickable.minHeight} src={x} alt={"x mark"}/>
        } else if (state===BUTTON_STATES.success) {
            return <Image height={clickable.minHeight} src={check} alt={"checkmark"}/>
        }
    }, [left, state]);

    const rightImage = useMemo(()=>right && <Image height={clickable.minHeight} src={right} />, [right]);

    return (
        <Button 
            onPress={()=>{console.log("ljkasdfjlkdsfajlk")}} 
            radius={rad.round} 
            color={color} 
            state={state}
            width={width}
            height={width}
            maxHeight={MAX_SIZE}
            maxWidth={MAX_SIZE}
        >
            <View style={style.container}>
                {leftImage || <View/> /*view is a placeholder to keep grid*/}
                {children}
                {rightImage || <View/> /*view is a placeholder to keep grid*/}
            </View>
        </Button>
    )
}