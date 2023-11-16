import React, { useState } from "react";
import Image from "../image/Image";
import { image } from "../styles/image";
import { radius as rad } from "../styles/radius";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { TouchableOpacity, View } from "react-native";
import Button from "../buttons/Button";
import { zindex } from "../styles/zindex";
import { ImageAsset } from "../../assets/ImageAsset";
import { Dialog, Portal } from "react-native-paper";
import { Text } from "react-native-paper";
import { Platform } from 'react-native';
import { ButtonSpan } from "../containers/ButtonSpan";
import { colors } from "../styles/colors";

export default function ImageInput({
    value="pfp",
    onChange=(image:ImageAsset)=>{},
    radius=rad.round,
}) {
    const [dialog, setDialog] = useState(false);

    function open() {
        setDialog(true);
    }

    function close() {
        setDialog(false);
    }

    function imageCallback(e) {
        onChange({
            aspectRatio: e.assets[0].height/e.assets[0].width,
            src: e.assets[0].uri
        })
    }

    function pickPhoto() {
        launchImageLibrary({mediaType:"photo"}, imageCallback);
        close();
    }

    function takePhoto() {
        launchCamera({mediaType:"photo"}, imageCallback);
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
                        <Button
                            radius={rad.round}
                            width={25}
                            height={25}
                        >+</Button>
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