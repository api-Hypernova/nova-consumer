import React, { useState } from 'react';
import {
  Image,
  ImageProps,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  GestureHandlerRootView,
  TapGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { Modal, CardContainer, CustomImage } from '../../../components';
import { Images } from '../../../config';
import { SD } from '../../../utils';
import { Zoomable } from '@likashefqet/react-native-image-zoom';

type FullImageViewProps = {
  isVisible: boolean;
  onClose: () => void;
  image: ImageProps['source'] | null;
  onBackPress: () => void;
  images: ImageProps['source'][]; // Array of images
  selectedImageIndex: number; // Current selected image index
  setSelectedImageIndex: React.Dispatch<React.SetStateAction<number>>; // Function to set selected image index
};

export const FullImageView: React.FC<FullImageViewProps> = ({
  isVisible,
  onClose,
  image,
  onBackPress,
  images,
  selectedImageIndex,
  setSelectedImageIndex,
}) => {
  const [zoom, setZoom] = useState(1); // Track zoom level

  const handleDoubleTap = () => {
    setZoom((prevZoom) => (prevZoom === 1 ? 2 : 1));
  };

  // Handle swipe gesture
  const [isSwiping, setIsSwiping] = useState(false); // Gesture lock

  const handleSwipe = (event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;

    if (isSwiping) return;

    if (translationX > 10 && selectedImageIndex > 0) {
      setIsSwiping(true);
      setSelectedImageIndex(selectedImageIndex - 1);
      setTimeout(() => setIsSwiping(false), 300); 
    }
    else if (translationX < -10 && selectedImageIndex < images.length - 1) {
      setIsSwiping(true);
      setSelectedImageIndex(selectedImageIndex + 1);
      setTimeout(() => setIsSwiping(false), 300); 
    }
  };

  const currentImage = images[selectedImageIndex];

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      mainContainerStyle={{ justifyContent: 'flex-end' }}
      animationType="none"
      modalStyles={{
        marginVertical: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
      }}>
      <GestureHandlerRootView style={styles.container}>
        <CardContainer onPress={onBackPress} customStyles={styles.iconContainer}>
          <CustomImage source={Images.whiteBackIcon} style={styles.Backbtn} />
        </CardContainer>

        <TapGestureHandler onActivated={handleDoubleTap} numberOfTaps={2}>
          <PanGestureHandler onGestureEvent={handleSwipe}>
            <View style={styles.imageContainer}>
              <TouchableWithoutFeedback>
                <Zoomable>
          
                    <Image
                      source={currentImage}
                      style={[
                        styles.media,
                        {
                          transform: [{ scale: zoom }], 
                        },
                      ]}
                      resizeMode="contain" 
                    />
                
                </Zoomable>
              </TouchableWithoutFeedback>
            </View>
          </PanGestureHandler>
        </TapGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  media: {
    width: '100%',
    height: '80%',
    marginTop: SD.hp(40),
  },
  container: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 40,
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: SD.wp(30),
    width: SD.wp(48),
    height: SD.hp(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SD.wp(15),
  },
  Backbtn: {
    width: SD.wp(24),
    height: SD.hp(24),
  },
  imageContainer: {
    flex: 1,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  placeholderImage: {
    width: SD.wp(100),
    height: SD.hp(100),
  },
});

