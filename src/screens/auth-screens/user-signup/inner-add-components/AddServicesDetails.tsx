import {
  AppState,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ComponentToRenderTypes} from '../UserSignupTypes';
import {
  AuthHeader,
  BackHeader,
  BottamButton,
  FormInputsComp,
  MainContainer,
  Modal,
  RecommendationCard,
  ResultsHeader,
} from '../../../../components';
import {AddServicesDetailsModal, FormBottomBtns} from '../../../../shared-ui';
import {useTheme} from '../../../../hooks';
import {Images} from '../../../../config';
import {SD} from '../../../../utils';
import {Formik, FormikHelpers, FormikValues} from 'formik';
import authSchema from '../../../../formik-schma/authSchema';

type AddServicesDetailsProps = ComponentToRenderTypes;

const RecommendationDetails = [
  {
    id: '1',
    imageSource: Images.unsplash1,
    title: 'Jack Salon',
    subtitle: 'You are one step closer on the journey to your dream body.',
    amount: '$150',
    time: '45 min',
  },
  {
    id: '2',
    imageSource: Images.unsplash2,
    title: 'Luxe Hair Studio',
    subtitle:
      'Transform your hair into a masterpiece with our expert stylists.',
    amount: '$150',
    time: '45 min',
  },
  {
    id: '3',
    imageSource: Images.unsplash3,
    title: 'Glow Spa',
    subtitle: 'Relax and rejuvenate with our premium spa treatments.',
    amount: '$150',
    time: '45 min',
  },
  {
    id: '4',
    imageSource: Images.hairCut,
    title: 'Urban Nails',
    subtitle: 'Pamper yourself with the finest manicure and pedicure services.',
    amount: '$150',
    time: '45 min',
  },
];

export const AddServicesDetails: React.FC<AddServicesDetailsProps> = ({
  currentForm,
  onPressBack,
  onPressNext,
  isNextFormAvailable,
}) => {
  const {AppTheme} = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const renderItem = ({item}: {item: any}) => (
    <RecommendationCard
      isService
      onButtonPress={() => {
        console.log('RecommendationCard');
      }}
      cardStyle={{
        marginVertical: SD.hp(10),
      }}
      imageSource={item.imageSource}
      title={item.title}
      subtitle={item.subtitle}
      amount={item.amount}
      time={item.time}
    />
  );

  return (
    <>
      <MainContainer isFlatList>
        <BackHeader
          heading="Add Services"
          subheading="Review your created service"
          isSeekBar
          seekBarRatio={currentForm}
          backFunction={onPressBack}
        />
        <View style={{flex: 1}}>
          <ResultsHeader
            isIcon
            title="Created Service"
            buttonTitle="Add another"
            buttonCustomStyle={{
              backgroundColor: AppTheme.BgColor2,
            }}
            onPress={() => {
              setModalVisible(true);
              console.log('Add another');
            }}
          />

          <View
            style={{
              marginTop: SD.hp(20),
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={RecommendationDetails}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.list}
            />
          </View>
        </View>
      </MainContainer>
      <FormBottomBtns
        onPressNext={onPressNext}
        isNextFormAvailable={isNextFormAvailable}
      />

      <AddServicesDetailsModal
        isModalVisible={isModalVisible}
        setModalVisible={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: SD.hp(100),
  },
});
