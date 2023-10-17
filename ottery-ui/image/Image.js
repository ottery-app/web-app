import React, { useMemo } from 'react';
import { Image as RNImage, View } from 'react-native';

// export const DEFAULT_IMAGES = {
//   gear: require('./gear.svg'),
//   pfp: require("./pfp.svg"),
//   dice: require("./dice.svg"),
//   check: require("./gear.svg"),
//   alert: require("./alert.svg"),
//   x: require("./x.svg"),
//   plus: require("./plus.svg"),
//   search: require("./search.svg"),
// };

const Image = ({
  src,
  alt,
  radius,
  width=radius,
  height=radius,
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
          aspectRatio: aspectRatio || imgAspect
        }}
      onClick={onClick}
    />
  );
};

export default Image;
