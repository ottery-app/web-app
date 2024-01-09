import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
import { ImageDto } from '@ottery/ottery-dto';
import { usePing } from '../../ottery-ping';
import { Platform } from 'react-native';

export const useImagePicker = () => {
  const Ping = usePing();

  const pickImage = async (onPick:(image:ImageDto)=>void) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
        allowsMultipleSelection: false,
        aspect: [1,1],
      });

      if (!result.canceled) {
        if (Platform.OS === "web") {
          onPick({
            src: result.assets[0].uri,
            aspectRatio: result.assets[0].height / result.assets[0].width, 
          });
        } else {
          let file = result.assets[0].uri.split(".");
          let type = file[file.length - 1];

          onPick({
            src: `data:image/${type};base64,` + result.assets[0].base64,
            aspectRatio: result.assets[0].height / result.assets[0].width, 
          });
        }
      }
    } catch (error) {
      Ping.error('Error picking image');
    }
  };
 
  return [pickImage]
};
