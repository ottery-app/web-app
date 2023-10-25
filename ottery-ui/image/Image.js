import React, { useMemo } from "react";
import { Image as RNImage, View } from "react-native";

import gear from "../../assets/images/gear.svg";
import pfp from "../../assets/images/pfp.svg";
import dice from "../../assets/images/dice.svg";
import check from "../../assets/images/check.svg";
import alert from "../../assets/images/alert.svg";
import x from "../../assets/images/x.svg";
import plus from "../../assets/images/plus.svg";
import search from "../../assets/images/search.svg";

export const DEFAULT_IMAGES = {
  gear,
  pfp,
  dice,
  check,
  alert,
  x,
  plus,
  search,
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
  );
};

export default Image;
