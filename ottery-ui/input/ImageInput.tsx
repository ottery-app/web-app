import React, { useState } from "react";
import Image from "../image/Image";
import { image } from "../styles/image";
import { radius as rad } from "../styles/radius";
import { TouchableOpacity, View } from "react-native";
import Button from "../buttons/Button";
import { zindex } from "../styles/zindex";
import { ImageDto as ImageAsset, ImageDto } from "@ottery/ottery-dto";
import { Dialog, Portal, TouchableRipple } from "react-native-paper";
import { Text } from "react-native-paper";
import { Platform } from 'react-native';
import { ButtonSpan } from "../containers/ButtonSpan";
import { colors } from "../styles/colors";
import { pfp } from "../../assets/icons";
import { InputProps } from "./Input";
import CameraComponent from "../camera/CameraComponent";
import { useImagePicker } from "../camera/useImagePicker";

export interface ImageInputProps extends InputProps<ImageAsset> {
    radius?: number,
}

export default function ImageInput({
    label,
    value=pfp,
    onChange=(image:ImageAsset)=>{},
    radius=rad.round,
}:ImageInputProps) {
    const [dialog, setDialog] = useState(false);
    const [take, setTake] = useState(false);
    const [pickImage] = useImagePicker();

    function open() {
        setDialog(true);
    }

    function close() {
        setDialog(false);
    }

    async function imageUpdateCallback(image:ImageDto) {
        onChange(image);
    }

    function pickPhoto() {
        pickImage((image)=>{
            onChange(image);
        })
        close();
    }

    function takePhoto() {
        setTake(true);
        close();
    }

    function closeCamera() {
        setTake(false);
    }

    return(
        <>  
            {(!take) 
                ? <>
                    <Text>{label}</Text>
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
                :undefined
            }
            {(take) 
                ? <Portal><CameraComponent
                    onClose={closeCamera}
                    onTake={imageUpdateCallback}
                /></Portal>
                : undefined
            }
        </>
    );
}