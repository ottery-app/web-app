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
  animation,
  opacity = 1,
  grayscale = "0%",
  aspectRatio,
}) => {
  const [imgSrc, imgAspect] = useMemo(() => {
    return [{ uri: src.src }, src.aspectRatio];
  }, [src]);

  return (
    <View
      style={{
        overflow: "hidden",
        borderRadius: radius,
      }}
    >
      <RNImage
        source={defaultSrc.hasOwnProperty(src) ? defaultSrc[src].src : imgSrc}
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
