import React, { useEffect, useState } from "react";
import Image from "../image/Image";
import { image } from "../styles/image";
import { radius as rad } from "../styles/radius";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { TouchableOpacity, View } from "react-native";
import Button from "../buttons/Button";
import { zindex } from "../styles/zindex";
import { ImageDto as ImageAsset } from "@ottery/ottery-dto";
import { Dialog, Portal, TouchableRipple } from "react-native-paper";
import { Text } from "react-native-paper";
import { Platform } from 'react-native';
import { ButtonSpan } from "../containers/ButtonSpan";
import { colors } from "../styles/colors";
import { pfp } from "../../assets/icons";
import { InputProps } from "./Input";

export interface ImageInputProps extends InputProps<ImageAsset> {
    radius: number,
}

export default function ImageInput({
    value=pfp,
    onChange=(image:ImageAsset)=>{},
    radius=rad.round,
}:ImageInputProps) {
    const [dialog, setDialog] = useState(false);

    function open() {
        setDialog(true);
    }

    function close() {
        setDialog(false);
    }

    async function imageCallback(e) {    
        
        let image = {
            aspectRatio: e.assets[0].height/e.assets[0].width,
            src: e.assets[0].uri
        };

        //image = await formatForApi(image);

        onChange(image);
    }

    function pickPhoto() {
        launchImageLibrary({
            mediaType: "photo",
        }, imageCallback)
        close();
    }

    function takePhoto() {
        launchCamera({mediaType:"photo"}, imageCallback)
        close();
    }

    return(
        <>
            <TouchableOpacity
                onPress={(Platform.OS === "web") ? pickPhoto : open}
                style={{
                    width:image.mediumProfile,
                    height:image.mediumProfile,
                }}
            >
                <View style={{
                    position: "absolute",
                    zIndex: zindex.front,
                }}>
                    <View style={{position: "relative"}}>
                        <TouchableRipple
                            style={{
                                backgroundColor: colors.primary.main,
                                height: 25,
                                width: 25,
                                borderRadius: rad.round,
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{
                                textAlign:"center",
                                color: colors.primary.contrastText,
                            }}>+</Text>
                        </TouchableRipple>
                    </View>
                </View>
                <Image
                    src={value}
                    alt={"Image input"}
                    width={image.mediumProfile}
                    height={image.mediumProfile}
                    radius={radius}
                />
            </TouchableOpacity>
            <Portal>
                <Dialog visible={dialog} onDismiss={close} dismissable={true}>
                    <Dialog.Title>Photo</Dialog.Title>
                    <Dialog.Content>
                        <Text>Choose an option for the photo</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <ButtonSpan>
                            <Button onPress={pickPhoto}>Album</Button>
                            <Button onPress={takePhoto}>Take Photo</Button>
                            <Button color={colors.error} onPress={close}>Cancel</Button>
                        </ButtonSpan>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
}