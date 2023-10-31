import Image from "../image/Image";
import { radius as rad } from "../styles/radius";
import {useMemo} from "react"
import {View, StyleSheet} from "react-native"
import Button from "./Button";
import { colors } from "../styles/colors";
import { check, x } from "../../assets/icons";
import { clickable } from "../styles/clickable";
import { BUTTON_STATES } from "./button.enum";

const style = StyleSheet.create({
    container: {
        marginBottom: 0,
        marginTop: 2,
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        width: "100%",
    },
})

export function ImageButton({
  left,
  right,
  children,
  color = colors.secondary,
  state,
  onPress,
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
            onPress={onPress} 
            radius={rad.round} 
            color={color} 
            state={state}
        >
            {(leftImage || rightImage)
                ?<View style={style.container}>
                    {leftImage || <View />}
                    {children}
                    {rightImage || <View />}
                </View>
                :children}
        </Button>
    )
}