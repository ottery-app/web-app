import imageCompression from 'browser-image-compression';
import { ImageDto, classifyWithDto } from 'ottery-dto';

export async function formatForApi(imageFile) {
    if (!classifyWithDto(ImageDto, imageFile)) {
        return undefined;
    }
    
    imageFile = await compress(imageFile);
    imageFile.src = await getRaw(imageFile);

    return imageFile;
}

export async function compress(imageFile) {
    try {
        const options = {
            maxSizeMB: 0.1, //100kb
            maxWidthOrHeight: 500,
            useWebWorker: false,
        }
        return await imageCompression(imageFile, options);
    } catch (error) {
      console.log(error);
    }
}

export async function getRaw(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            resolve(event.target.result);
        }
        reader.onerror = (error)=>{
            reject(error);
        }
        reader.readAsDataURL(file);
    })
}