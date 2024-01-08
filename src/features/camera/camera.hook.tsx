import React, { useEffect } from 'react';
import { View, TouchableOpacity, useWindowDimensions, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Text } from 'react-native-paper';
import { usePing } from '../../../ottery-ping';
import { zindex } from '../../../ottery-ui/styles/zindex';

export function useCamera() {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
  const {width, height} = useWindowDimensions();
  const Ping = usePing();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      console.log(status);
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  function CameraInner() {
    if (hasCameraPermission === null) {
      return undefined;
    }
    if (hasCameraPermission === false) {
      return undefined;
    }

    return (
      <Camera
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          width:"100%",
          zIndex:zindex.absolute,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              // Handle taking a picture here if needed
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }

  return { Camera: CameraInner };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // camera: {
  //   position: "absolute",
  //   top: 0,
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   width:width,
  //   height: height,
  //   zIndex:zindex.absolute,
  // }
});