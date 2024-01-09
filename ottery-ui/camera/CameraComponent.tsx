import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Image from '../image/Image';
import {camera, flip, x} from '../../assets/icons';
import { image } from '../styles/image';
import { radius } from '../styles/radius';
import { clickable } from '../styles/clickable';
import { margin } from '../styles/margin';
import { useScreenDimensions } from '../../src/hooks/dimentions.hook';
import * as FileSystem from 'expo-file-system';
import { ImageDto } from '@ottery/ottery-dto';

const imageToBase64 = async (imageUri) => {
  try {
    let base64Image = '';
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    if (fileInfo.exists) {
      const fileContent = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      base64Image = `data:image/jpg;base64,${fileContent}`;
      // Use the base64Image as needed (e.g., send it to an API or display it)
    }
    return base64Image;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return '';
  }
};

export interface CameraProps {
  onClose: ()=>void,
  onTake: (img:ImageDto)=>void,
}

const CameraComponent = (props: CameraProps) => {
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
      photo.uri = await imageToBase64(photo.uri);

      props.onTake({
        aspectRatio:photo.width/photo.height,
        src: photo.uri,
      });

      props.onClose();
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
        left: margin.large, 
        alignSelf: 'center',
        padding: 3, 
        borderRadius: radius.round,
        backgroundColor: backgroundOpacity
      }}>
        <TouchableOpacity onPress={props.onClose}>
          <Image
            src={x}
            alt={'close camera'}
            height={clickable.minHeight}
            width={clickable.minWidth}
          />
        </TouchableOpacity>
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
            alt={'flip camera button'}
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
