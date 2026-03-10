import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export const checkLocationPermission = async (
  callback: (lat: number, lng: number) => void,
) => {
  try {
    // Request location permissions with Expo
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      showLocationPermissionAlert();
      return;
    }

    getCurrentLocation((lat, lng) => callback(lat, lng));
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentLocation = async (
  callback: (lat: number, lng: number) => void,
) => {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    
    const { latitude, longitude } = location.coords;
    callback(latitude, longitude);
  } catch (error) {
    console.error(error);
    Alert.alert('Error getting location: ' + error.message);
  }
};

export const showLocationPermissionAlert = () => {
  Alert.alert(
    'Location Permission Required',
    'Please enable location services to continue.',
    [
      {text: 'Go to Settings', onPress: () => Linking.openSettings()},
      {text: 'Cancel', style: 'cancel'},
    ],
  );
};

