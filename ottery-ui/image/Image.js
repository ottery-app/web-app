import React, { useMemo } from "react";
import { Image as RNImage, View } from "react-native";
import {
  pfp,
  x,
  closedMailWithHalo,
  check,
} from "../../assets/icons";

const defaultSrc = {
  pfp,
  x,
  closedMailWithHalo,
  check,
};

const Image = ({
  src,
  alt,
  radius = undefined,
  width = radius,
  height = radius,
  maxWidth=undefined,
  maxHeight=undefined,
  onClick=undefined,
  opacity = 1,
  aspectRatio = undefined,
}) => {
  const [imgSrc, imgAspect] = useMemo(() => {
    const aspectRatio = aspectRatio || src?.aspectRatio;
    src = defaultSrc.hasOwnProperty(src) ? defaultSrc[src].src : src?.src;
    return [src, aspectRatio];
  }, [src, aspectRatio]);

  return (
    <View
      style={{
        overflow: "hidden",
        borderRadius: radius,
        width: width,
        height: height,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
      }}
      onClick={onClick}
    >
      <RNImage
        source={{uri:imgSrc}}
        alt={alt}
        style={{
          resizeMode: "cover",
          borderRadius: radius,
          opacity,
          width: width,
          height: height,
          aspectRatio: imgAspect,
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          resizeMode: "cover", // Adjust the resizeMode as needed
        }}
      />
    </View>
  );
};

export default Image;
