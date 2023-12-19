import { View } from "react-native";
import { useScreenDimensions } from "../hooks/dimentions.hook";
import { useQueryStatus } from "./useQueryInfo";
import { colors } from "../../ottery-ui/styles/colors";
import { logoHead } from "../../assets/logos";
import { image } from "../../ottery-ui/styles/image";
import { pfp } from "../../assets/icons";
import Image from "../../ottery-ui/image/Image";

export function AwaitGlobalLoad({children}) {
    const status = useQueryStatus();
    const {height, width} = useScreenDimensions();

    const done = true//status.every(stat=>stat!=="loading");

    return (
        <>
            {!done
                ? <View style={{
                    height,
                    width,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:colors.background.secondary,
                }}>
                    <Image
                        src={logoHead}
                        alt={"loading image"}
                        width={image.largeProfile}
                    />
                </View>
                :undefined
            }
            {children}
        </>
    )
}