import {FlatList, Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TTextInput as TextInput, useT} from '../../../i18n';
import React, {useState} from 'react';
import moment from 'moment';
import {
  BackHeader,
  CalenderProfile,
  CardContainer,
  CustomImage,
  MainContainer,
  SharedServiceCard,
  Text,
} from '../../../components';
import navigationService from '../../../config/navigationService';
import {Images} from '../../../config';
import {SD} from '../../../utils';
import {useTheme} from '../../../hooks';
import {Bubble, GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import ENFonts from '../../../styles/fonts';
import {BorderlessButton} from 'react-native-gesture-handler';

export const ChatScreen = () => {
  const {AppTheme} = useTheme();
  const t = useT();

  const handleGoback = () => {
    navigationService.goBack();
  };

  const [draft, setDraft] = useState('');
  const sendDraft = () => {
    const t = draft.trim();
    if (!t) return;
    setMessages((prev: any) => [{_id: Date.now(), text: t, createdAt: new Date(2026, 9, 25, 10, 35), user: {_id: 1, name: 'You'}}, ...prev]);
    setDraft('');
    setTimeout(() => setMessages((prev: any) => [{_id: Date.now() + 1, text: 'Wonderful, you are all set. See you Thursday at 10:00!', createdAt: new Date(2026, 9, 25, 10, 36), user: {_id: 2, name: 'Atelier Lumen'}}, ...prev]), 1400);
  };
  const [messages, setMessages] = useState([
    {_id: 5, text: 'Perfect, see you Thursday at 10:00. Parking is free behind the studio.', createdAt: new Date(2026, 9, 25, 10, 34), user: {_id: 2, name: 'Atelier Lumen'}},
    {_id: 4, text: 'Great, please book me in with Theo for the cut and a gloss.', createdAt: new Date(2026, 9, 25, 10, 33), user: {_id: 1, name: 'You'}},
    {_id: 3, text: 'Yes, Thursday at 10:00 is open. The cut takes about 45 minutes.', createdAt: new Date(2026, 9, 25, 10, 32), user: {_id: 2, name: 'Atelier Lumen'}},
    {_id: 2, text: 'Hi! Do you have anything open Thursday morning?', createdAt: new Date(2026, 9, 25, 10, 31), user: {_id: 1, name: 'You'}},
    {_id: 1, text: 'Hi Avery, welcome to Atelier Lumen. How can we help?', createdAt: new Date(2026, 9, 25, 10, 30), user: {_id: 2, name: 'Atelier Lumen'}},
  ]);

  return (
    <>
      
        <BackHeader
          HeadingContainerProps={{
            isSubHeadig: false,
          }}
          customeStyle={{
            paddingHorizontal: SD.wp(20),
            marginTop: SD.hp(10),
          }}
          isCenterdHeading
          CenterdHeading="Messages"
        />
     

      <CalenderProfile
        isTitle
        color={AppTheme.Primary}
        titleSize={14}
        subTitleSize={12}
        containerCustomStyle={styles.calendarContainer(AppTheme)}
        isCallIcon
        title="Atelier Lumen"
        subTitle="Online"
        stylesContainer={styles.calendarInnerContainer}
        customImageStyle={styles.calendarImage}
      />

      <View style={styles.separator} />

      <View style={styles.contentContainer}>
        <SharedServiceCard
          cardContainerStyle={styles.sharedCardContainer}
          title={'Signature Cut & Style'}
          location={'214 Larkspur Ave, Marlowe Bay'}
          amount="$40"
          rating={'4.5'}
          views={'84'}
        />

        <GiftedChat
          listViewProps={{showsVerticalScrollIndicator: false}}
          messages={messages.map((m: any) => ({...m, text: t(m.text)}))}
          user={{
            _id: 1,
          }}
          renderBubble={props => {
            const isSender = props.currentMessage.user._id === 1;

            return (
              <View>
                <Bubble
                  {...props}
                  renderTime={() => null}
                  wrapperStyle={{
                    left: styles.bubbleLeftWrapper,
                    right: styles.bubbleRightWrapper(AppTheme),
                  }}
                  textStyle={{
                    left: styles.bubbleLeftText(AppTheme),
                    right: styles.bubbleRightText,
                  }}
                />
                <View
                  style={[
                    styles.timeContainer,
                    {alignSelf: isSender ? 'flex-end' : 'flex-start'},
                  ]}>
                  <Text color={AppTheme.GreyTimeColor} size={12} medium>
                    {moment(props.currentMessage.createdAt).format('h:mm A')}
                  </Text>
                </View>
              </View>
            );
          }}
          renderInputToolbar={props => (
            <View style={styles.inputContainer}>
              <View style={styles.inputToolbar(AppTheme)}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type message..."
                  placeholderTextColor="#8A8A8A"
                  value={draft}
                  onChangeText={setDraft}
                  multiline={true}
                />
              </View>

              <CardContainer
                activeOpacity={0.7}
                onPress={sendDraft}
                customStyles={styles.sendButton(AppTheme)}>
                <Image source={Images.sendIcon} style={styles.sendIcon} />
              </CardContainer>
            </View>
          )}
          renderAvatar={null}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create<any>({
  headerContainer: {
    // paddingHorizontal: SD.wp(20),
    marginTop: SD.hp(50),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: SD.wp(40),
    height: SD.hp(40),
  },
  headerTitleContainer: {
    marginLeft: SD.wp(95),
  },
  calendarContainer: (AppTheme: any) => ({
    marginTop: SD.hp(30),
    paddingBottom: SD.hp(20),
    paddingHorizontal: SD.wp(20),
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.BorderBlackColor,
  }),
  calendarInnerContainer: {
    height: SD.hp(30),
    justifyContent: 'space-between',
  },
  calendarImage: {
    marginRight: SD.wp(10),
  },
  separator: (AppTheme: any) => ({
    marginTop: SD.hp(10),
    borderWidth: 0.5,
    borderColor: AppTheme.BorderBlackColor,
  }),
  contentContainer: {
    flex: 1,
    paddingHorizontal: SD.wp(20),
  },
  sharedCardContainer: {
    BorderWidth: 1,
    marginTop: SD.hp(20),
    marginBottom: SD.hp(15),
  },
  bubbleLeftWrapper: {
    maxWidth: SD.wp(270),
    backgroundColor: '#f3f3f3',
    paddingVertical: SD.hp(5),
    paddingHorizontal: SD.wp(20),
    borderBottomLeftRadius: 0,
  },
  bubbleRightWrapper: (AppTheme: any) => ({
    maxWidth: SD.wp(270),
    backgroundColor: AppTheme.Primary,
    paddingVertical: SD.hp(5),
    paddingHorizontal: SD.wp(20),
    borderBottomRightRadius: 0,
  }),
  bubbleLeftText: (AppTheme: any) => ({
    flexShrink: 1,
    color: AppTheme.PrimaryTextColor,
    fontSize: SD.customFontSize(14),
    fontFamily: ENFonts['Medium'],
  }),
  bubbleRightText: {
    flexShrink: 1,
    color: '#fff',
    fontSize: SD.customFontSize(14),
    fontFamily: ENFonts['Medium'],
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SD.wp(75),
    height: SD.hp(20),
    marginBottom: SD.hp(15),
    marginTop: SD.hp(5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SD.hp(30),
    justifyContent: 'space-between',
  },
  textInput: (AppTheme: any) => ({
    color: AppTheme.PrimaryTextColor,
    fontSize: SD.customFontSize(14),
    fontFamily: ENFonts['Medium'],
  }),
  inputToolbar: (AppTheme: any) => ({
    borderRadius: SD.wp(30),
    width: '82%',
    height: SD.hp(50),
    justifyContent: 'center',
    marginVertical: SD.hp(10),
    borderColor: AppTheme.chatBorderInput,
    borderWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: SD.wp(15),
  }),
  sendButton: (AppTheme: any) => ({
    height: SD.hp(45),
    width: Platform.OS === 'ios' ? SD.wp(45) : SD.wp(43),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SD.wp(30),
    backgroundColor: AppTheme.Primary,
  }),
  sendIcon: {
    height: SD.hp(20),
    width: SD.wp(20),
  },
});
