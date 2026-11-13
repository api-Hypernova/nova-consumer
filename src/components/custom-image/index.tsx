import React from "react";
import { Image, ImageProps, StyleSheet } from "react-native";
import Images from "../../config/images";
import { useIsRtl } from "../../i18n";

type CustomImageProps = Omit<ImageProps, "source"> & {
  source: ImageProps["source"];
};

// Arrows that point left/right: mirrored when the layout is right to left (Hebrew), so "back" still points back.
const DIRECTIONAL = new Set<any>(
  [Images.Backbtn, Images.whiteBackIcon, Images.arrow, Images.arrowRight, Images.chevronRight].filter(Boolean)
);

export const CustomImage: React.FC<CustomImageProps> = ({
  source,
  resizeMode,
  style,
  ...rest
}) => {
  const rtl = useIsRtl();
  let finalStyle = style;
  if (rtl && DIRECTIONAL.has(source as any)) {
    const flat: any = StyleSheet.flatten(style) || {};
    if (!flat.transform) finalStyle = [style, styles.mirror];
  }
  return (
    <Image source={source} resizeMode={resizeMode || "contain"} style={finalStyle} {...rest} />
  );
};

const styles = StyleSheet.create({ mirror: { transform: [{ scaleX: -1 }] } });
