import {Platform, StyleSheet} from 'react-native';
import {SD} from '../../utils';

export const styles = StyleSheet.create<any>({
  // container: (AppTheme: any) => ({
  //   // borderWidth: 1,
  //   backgroundColor: AppTheme.Base,
  //   borderRadius: SD.hp(12),

  // }),
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SD.hp(16),
    borderRadius: 10,
    height: SD.hp(64),
    marginVertical: SD.hp(8),
  },
  textContainer: {
    justifyContent: 'space-between',
    // borderWidth: 1,
    width: '87%',
  },
  spacer: {
    height: SD.hp(8), // Adjust the height as needed
    // borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E2A39',
    borderWidth: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#78849E',
  },
  circleContainer: {
    width: SD.wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 34,
    height: 26,
    borderRadius: 18,
    backgroundColor: '#E9F0F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#3465A4',
    fontSize: 18,
    fontWeight: 'bold',
  },

  textStyles: {
    marginTop: SD.hp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flexRowStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
