import {StyleSheet} from 'react-native';
import {SD} from '../../../utils';
import {useTheme} from '../../../hooks';

const {AppTheme} = useTheme();

const styles = StyleSheet.create<any>({
  roleOption: (AppTheme: any) => ({
    height: SD.hp(60),
    borderRadius: SD.hp(30),
    paddingHorizontal: SD.wp(15),
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: SD.hp(10),
    backgroundColor: AppTheme.BackGroundColor,
    borderColor: AppTheme.BorderColor,
  }),
  roleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
  },
  roleIcon: {
    height: SD.hp(35),
    width: SD.wp(35),
  },
  arrowContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    height: SD.hp(10),
    width: SD.wp(10),
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: SD.hp(10),
    paddingHorizontal: SD.hp(20),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderColor: AppTheme.BorderColor,
    borderTopWidth: 0.5,
  },
});

export default styles;
