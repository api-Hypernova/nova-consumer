import {StyleSheet} from 'react-native';
import {SD} from '../../../utils';

export const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundImageContainer: {
    borderWidth: 1,

    width: SD.wp(40),
    height: SD.hp(40),
    marginLeft: SD.wp(0),
    marginRight: SD.wp(8),
  },
  header: {
    position: 'absolute',
    top: SD.hp(60),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingHorizontal: SD.wp(16),
    // borderWidth: 1,
  },

  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: SD.wp(30),
    width: SD.wp(48),
    height: SD.hp(48),
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },

  Backbtn: {
    width: SD.wp(24),
    height: SD.hp(24),
    // borderWidth: 1,
  },

  image: {
    width: '100%',
    height: 350,
    position: 'relative',
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: SD.hp(20),
    paddingHorizontal: SD.wp(24),
    // paddingBottom: SD.hp(35),
    marginTop: -20,
    borderBottomWidth: 0.5,
  },
  tagContainer: {
    width: '38%',
    paddingVertical: SD.hp(8),
    borderRadius: SD.hp(30),
    backgroundColor: '#f6f6f6',
  },
  businessInfo: {
    marginTop: SD.hp(10),
  },
  serviceSection: {
    paddingHorizontal: SD.wp(25),
    paddingTop: SD.hp(10),
  },
  cardContainer: {
    paddingHorizontal: SD.wp(20),
    // borderWidth: 1,
  },

  cardContainerStyle: {
    height: SD.hp(123),
    marginBottom: SD.hp(10),
  },
  shareContainerStyles: {
    width: SD.wp(102),
    height: SD.hp(40),
    borderRadius: SD.hp(30),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: SD.wp(35),
    top: SD.hp(-20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  servicesCardImageStyle: {
    width: SD.wp(92),
    height: SD.hp(92),
  },
  serviceCardViewStyles: {
    marginTop: SD.hp(10),
    alignSelf: 'flex-start',
  },

  galleryMainContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: SD.hp(15),
  },
  galeryCardContainer: {
    width: '32%',
    height: SD.hp(110),
    borderRadius: SD.hp(17),
    overflow: 'hidden',
    marginHorizontal: '0.6%',
    alignSelf: 'center',
    // borderWidth: 1,
  },
  ratingContainer: {
    borderWidth: 1,
    paddingVertical: SD.hp(10),
    paddingHorizontal: SD.wp(12),
    borderRadius: SD.hp(8),
  },

  modalContainer: {
    justifyContent: 'flex-end',
  },
  modalStyles: {
    margin: 0,
    height: '93%',
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crossIcon: {
    width: SD.wp(38),
    height: SD.hp(38),
    marginRight: SD.wp(15),
    borderWidth: 0,
    padding: 2,
  },
  mainContentContainer: {
    paddingHorizontal: SD.wp(5),
    paddingTop: SD.hp(5),
    marginTop: SD.hp(10),
  },
  imageSectionContainer: {
    height: SD.hp(500),
    width: '100%',
    overflow: 'hidden',
  },
  serviceImage: {
    height: '50%',
    width: '100%',
    borderRadius: SD.hp(20),
    resizeMode: 'cover',
  },
  priceCardContainer: (AppTheme: any) => ({
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SD.wp(115),
    height: SD.hp(36),
    borderRadius: SD.hp(20),
    backgroundColor: AppTheme.BgColor2,
    // marginTop: SD.hp(10),
  }),
  openingHoursContainer: (AppTheme: any) => ({
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: AppTheme.BorderColor,
    marginTop: SD.hp(10),
    height: SD.hp(100),
    paddingTop: SD.hp(12),
  }),
  openingHoursRow: {
    flexDirection: 'row',
  },
  dotIcon: {
    width: SD.wp(12),
    height: SD.hp(12),
    marginTop: SD.hp(16),
    marginLeft: SD.wp(10),
  },
  openingHoursTextContainer: {
    marginLeft: SD.wp(10),
    height: SD.hp(40),
  },
  servicesSectionContainer: {
    height: SD.hp(140),
    paddingVertical: SD.hp(5),
  },
  servicesListContainer: {
    paddingHorizontal: SD.wp(5),
  },
  selectButton: {
    marginTop: SD.hp(20),
    alignSelf: 'center',
  },
});
