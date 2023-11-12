import React, { useMemo } from "react";
import { Image as RNImage, View } from "react-native";
import {
  pfp,
  x,
  closedMailWithHalo,
  check,
  checkmark,
  xmark,
} from "../../assets/icons";

const defaultSrc = {
  pfp,
  x,
  closedMailWithHalo,
  check,
  checkmark,
  xmark,
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
  grayscale = "0%",
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
          resizeMode: "cover", // Adjust the resizeMode as needed
        }}
        onClick={onClick}
      />
    </View>
  );
};

export default Image;
