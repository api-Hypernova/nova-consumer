import {StyleSheet, Dimensions, Platform} from 'react-native';
import {SD} from '../../../utils';
import {useTheme} from '../../../hooks';

const {width} = Dimensions.get('window');
const {AppTheme} = useTheme();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.Base,
  },
  slide: {
    width: width,
  },
  image: {
    width: '100%',
    height: '80%',
    position:"relative"
  },
  // content: {
  //   height: '40%',
  //   position: 'absolute',
  //   top: 360,
  //   width: '100%',
  //   justifyContent: 'space-between',
  //   borderWidth:1
  // },
  textContainer: {
    padding: SD.hp(20),
    paddingLeft:0,
    paddingRight:0,
    borderTopLeftRadius: SD.hp(24),
    borderTopRightRadius: SD.hp(24),
    backgroundColor: AppTheme.Base,
    marginTop: -240,
  },
  title: {
    marginVertical: SD.hp(16),
    // borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: SD.hp(5),
  },
  description:{
// backgroundColor:"red",
width:"90%",
alignSelf: 'center',

  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SD.hp(24),
  },
  dot: {
    width: SD.wp(12),
    height: SD.hp(12),
    borderRadius: SD.wp(10),
    marginHorizontal: SD.wp(5),
  },
  buttonContainer: {
    backgroundColor: AppTheme.Base,
    paddingVertical: SD.hp(10),
    paddingHorizontal: SD.hp(20),
    position: 'absolute',
    bottom: -10,
    width: '100%',
    borderTopWidth: 0.5,
    borderColor: AppTheme.BorderColor,
  },
  paginationContainer:{
    flexDirection:"row",
    justifyContent:"center",
    marginTop:Platform.OS === 'ios' ? SD.hp(50) : SD.hp(90),
  }
});

export default styles;
