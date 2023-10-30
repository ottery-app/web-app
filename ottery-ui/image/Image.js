import React, { useMemo } from "react";
import { Image as RNImage, View } from "react-native";
import { pfp, x, closedMailWithHalo, check } from "../../assets/icons";

const defaultSrc = {
  pfp,
  x,
  closedMailWithHalo,
  check,
};

const Image = ({
  src,
  alt,
  radius,
  width = radius,
  height = radius,
  maxWidth,
  onClick,
  opacity = 1,
  grayscale = "0%",
  aspectRatio,
}) => {
  const [imgSrc, imgAspect] = useMemo(() => {
    const aspectRatio = aspectRatio || src?.aspectRatio;
    src = defaultSrc.hasOwnProperty(src) ? defaultSrc[src].src : src?.src
    return [src, aspectRatio];
  }, [src, aspectRatio]);

  return (
    <View
      style={{
        overflow: "hidden",
        borderRadius: radius,
        width: width,
        height: height,
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
          aspectRatio: imgAspect,
          maxWidth,
          resizeMode: 'cover', // Adjust the resizeMode as needed
        }}
        onClick={onClick}
      />
    </View>
  );
};

export default Image;
