import React, { useMemo } from 'react';
import { Image as RNImage, View } from 'react-native';

const Image = ({
  src,
  alt,
  radius,
  width=radius,
  height=radius,
  maxWidth,
  onClick,
  animation,
  opacity = 1,
  grayscale = '0%',
  aspectRatio,
}) => {
  const [imgSrc, imgAspect] = useMemo(()=>{
    return [{ uri: src.src }, src.aspectRatio];
  }, [src]);

  return (
    <View
      style={{
        overflow: 'hidden',
        borderRadius: radius,
      }}
    >
      <RNImage
        source={imgSrc}
        alt={alt}
        style={{ 
            resizeMode: "cover",
            borderRadius: radius, 
            opacity, 
            filter: { grayscale },
            width: width,
            height: height,
            aspectRatio: aspectRatio || imgAspect,
            maxWidth,
          }}
        onClick={onClick}
      />
    </View>
  );
};

export default Image;
