import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BlurView} from '@react-native-community/blur';
import React, {useCallback, useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, View, ViewProps} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {ThemeColors} from '../../styles';
import {SD} from '../../utils';
import {CustomTouchable} from '../custom-touchable';
const {width, height}: {width: number; height: number} =
  Dimensions.get('window');
type CustomBottomSheetProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  children: React.ReactNode;
  snapPointsValues?: string[];
  customHandleStyle?: ViewProps['style'];
  isBlur?: boolean;
  enablePanDownToClose?: boolean;
  onSwipeDown?: () => void;
};

export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  isVisible,
  setIsVisible,
  onClose,
  children,
  snapPointsValues,
  customHandleStyle,
  isBlur = true,
  enablePanDownToClose = false,
  onSwipeDown,
}) => {
  const {AppTheme} = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = snapPointsValues || ['25%', '55%'];

  // renders
  //   const renderBackdrop = useCallback(
  //     (props: BottomSheetBackdropProps) => (
  //       <BottomSheetBackdrop
  //         {...props}
  //         disappearsOnIndex={1}
  //         appearsOnIndex={2}
  //       />
  //     ),
  //     []
  //   );

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
    } else if (!isVisible) {
      bottomSheetRef.current?.dismiss();
    }
  }, [isVisible]);

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
    setIsVisible(false);
    console.log('closeBottomSheet');
  };
  const handleSheetChanges = useCallback(
    (index: number) => {
      // console.log("handleSheetChanges", index);
      if (index === -1) {
        closeBottomSheet();
      }
    },
    [isVisible],
  );

  // console.log('isVisible', isVisible);

  const renderBottomSheet = (
    <BottomSheetModal
      onDismiss={onSwipeDown}
      ref={bottomSheetRef}
      index={isVisible ? 1 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      // backdropComponent={renderBackdrop}
      style={{
        flex: 1,
        backgroundColor: AppTheme.Base,
        borderTopStartRadius: SD.hp(33),
        borderTopEndRadius: SD.hp(33),
        // borderWidth: 1,
        ...SD.createShadow,
      }}
      enablePanDownToClose={enablePanDownToClose}
      handleStyle={[
        {
          backgroundColor: AppTheme.Base,
          borderTopStartRadius: SD.hp(33),
          borderTopEndRadius: SD.hp(33),
        },
        customHandleStyle,
      ]}
      handleIndicatorStyle={{
        backgroundColor: AppTheme.CardBorderColor,
        width: '20%',
        height: SD.hp(4),
        marginTop: SD.hp(10),
      }}
      backgroundStyle={{
        backgroundColor: AppTheme.Transparent,
        borderTopStartRadius: SD.hp(50),
        borderTopEndRadius: SD.hp(50),
        borderWidth: 1,
      }}>
      <BottomSheetView style={styles.contentContainerStyles(AppTheme.Base)}>
        <View style={{flex: 1}}>{children}</View>
      </BottomSheetView>
    </BottomSheetModal>
  );

  return (
    <BottomSheetModalProvider>
      {isVisible && isBlur ? (
        <CustomTouchable
          onPress={closeBottomSheet}
          style={{
            width: width,
            height: height,
            position: 'absolute',
            //   zIndex: 1,
            // backgroundColor: 'red',
          }}>
          <BlurView
            style={styles.overlay}
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor={ThemeColors.White}
          />
          {renderBottomSheet}
        </CustomTouchable>
      ) : (
        renderBottomSheet
      )}
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

  contentContainerStyles: (color: string) => ({
    flex: 1,
    backgroundColor: color,
    paddingHorizontal: SD.wp(20),
    // paddingVertical: SD.hp(20),
    // borderWidth: 1,
    // borderColor: "blue",
  }),
  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    // backgroundColor: 'rgba(17, 33, 48, 0.10)',
  },
});
