import React from "react";
import Image from "../image/Image";
import { image } from "../styles/image";
import { radius as rad } from "../styles/radius";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { TouchableOpacity, View } from "react-native";
import Button from "../buttons/Button";
import { zindex } from "../styles/zindex";
import { ImageAsset } from "../../assets/ImageAsset";

const shift = 25;

export default function ImageInput({
    value="pfp",
    onChange=(image:ImageAsset)=>{},
    radius=rad.round,
}) {
    return(
        <TouchableOpacity
            onPress={()=>{
                launchImageLibrary({mediaType:"photo"}, (e)=>{onChange({
                    aspectRatio: e.assets[0].height/e.assets[0].width,
                    src: e.assets[0].uri
                })})
            }}
            style={{
                width:image.mediumProfile,
                height:image.mediumProfile,
            }}
        >
            <View
                style={{
                    position: "relative",
                    top: -shift,
                    zIndex: zindex.front,
                }}
            >
                <View style={{
                    position: "relative",
                    top: shift,
                    zIndex: zindex.front,
                }}>
                    <Button
                        radius={rad.round}
                        width={25}
                        height={25}
                    >+</Button>
                </View>
                <Image
                    src={value}
                    alt={"Image input"}
                    width={image.mediumProfile}
                    height={image.mediumProfile}
                    radius={radius}
                />
            </View>
        </TouchableOpacity>
    );
}