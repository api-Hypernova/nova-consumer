import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  ImageProps,
  ImageStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../hooks";
import { CustomImage } from "../custom-image";

export type FadeInImageProps = {
  source: ImageProps["source"];
  resizeMode?: ImageProps["resizeMode"];
  customImageContainerStyle?: ViewStyle;
  imageStyles?: ImageStyle;
};

export const FadeInImage: React.FC<FadeInImageProps> = ({
  source,
  resizeMode = "contain",
  customImageContainerStyle,
  imageStyles,
}) => {
  const [isLoad, setIsLoad] = useState(false);
  const { AppTheme } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0))?.current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={customImageContainerStyle}>
      {/* {isLoad && (
        <ActivityIndicator size={"small"} color={AppTheme.Primary} />
        // <LottieAnimatedComponent
        //   src={require('../../assets/animations/loadingImage.json')}
        //   customStyle={{
        //     width: '100%',
        //     height: '100%',
        //     position: 'absolute',
        //     top: 0,
        //     zIndex: 100,
        //     //   alignSelf: "center",
        //   }}
        // />
      )} */}

      <CustomImage
        source={source}
        style={[
          {
            // opacity: fadeAnim,
            width: "100%", // Adjust the size as needed
            height: "100%",
          },
          imageStyles,
        ]}
        resizeMode={resizeMode}
        onLoadStart={() => setIsLoad(true)}
        onLoadEnd={() => setIsLoad(false)}
        onLoad={() => setIsLoad(false)}
      />
    </View>
  );
};
