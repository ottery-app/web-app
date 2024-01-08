import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Image from '../image/Image';
import {camera, flip} from '../../assets/icons';
import { image } from '../styles/image';
import { radius } from '../styles/radius';
import { clickable } from '../styles/clickable';
import { margin } from '../styles/margin';
import { useScreenDimensions } from '../../src/hooks/dimentions.hook';

export interface CameraProps {
  onClose: ()=>{},
  onTake: ()=>{},
}

const CameraComponent = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const {width} = useScreenDimensions();

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  function changeType() {
    setType((p)=>{
        if (p === CameraType.front) {
            return CameraType.back;
        } else {
            return CameraType.front;
        }
    })
  }

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      // `photo` will contain the captured image data
      console.log(photo);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const backgroundOpacity =  'rgba(255, 255, 255, 0.5)';

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, aspectRatio:1, transform: [{ translateX: -width/2 }], }}>
        <Camera
          type={type}
          autoFocus={true}
          style={{ flex: 1 }}
          ref={(ref) => setCameraRef(ref)}
          ratio="1:1" // Set the ratio to 1:1 for a square preview
        />
      </View>
      <View style={{ 
        position: 'absolute',
        top: margin.large + margin.large + margin.large, 
        right: margin.large, 
        alignSelf: 'center',
        padding: 3, 
        borderRadius: radius.round,
        backgroundColor: backgroundOpacity
      }}>
        <TouchableOpacity onPress={changeType}>
          <Image
            src={flip}
            alt={'take picture button'}
            height={clickable.minHeight}
            width={clickable.minWidth}
          />
        </TouchableOpacity>
      </View>
      <View style={{ position: 'absolute', bottom: margin.large, alignSelf: 'center'}}>
        <TouchableOpacity onPress={takePicture} style={{ 
            padding: margin.small,
            borderRadius: radius.round,
            backgroundColor: backgroundOpacity,
        }}>
          <Image
            src={camera}
            alt={'take picture button'}
            height={image.mediumProfile}
            width={image.mediumProfile}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraComponent;
