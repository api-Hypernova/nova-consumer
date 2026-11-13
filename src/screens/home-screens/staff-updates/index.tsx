import {StyleSheet, View} from 'react-native';
import {TText as Text} from '../../../i18n';
import React from 'react';
import {BackHeader, MainContainer} from '../../../components';
import {Images} from '../../../config';
import {UpdatesSectionList} from '../../../shared-ui';

const notifications: UpdatesSectionListDataType[] = [
  {
    title: 'Today',
    id: '1.2',
    data: [
      {
        id: '1',
        type: 'Booking Confirmed',
        time: '15:17',
        user: {
          name: 'Atelier Lumen',
          message: 'Your cut with Theo is set for Thu 19 Nov, 10:00',
          avatar: Images.profileImg, // Replace with actual image URL
        },
      },
      {
        id: '2',
        type: 'Message',
        time: '15:01',
        user: {
          name: 'Maison Verre',
          message:
            'Hi Avery, we have a Friday opening at 16:30 if you would like to move your gloss treatment. Just reply here.',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
    ],
  },
  {
    title: 'Last Week',
    id: '2.1',
    data: [
      {
        id: '3',
        type: 'Booking confirmed - Sep 22, 2026 at 14:30',
        time: null,
        user: {
          name: 'Orchid & Oak',
          message: '38 Willow Row, Marlowe Bay',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '4',
        type: 'Booking confirmed - Sep 22, 2026 at 14:30',
        time: null,
        user: {
          name: 'Orchid & Oak',
          message: '38 Willow Row, Marlowe Bay',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '5',
        type: 'Booking confirmed - Sep 22, 2026 at 14:30',
        time: null,
        user: {
          name: 'Orchid & Oak',
          message: '38 Willow Row, Marlowe Bay',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
    ],
  },
];

export const StaffUpdates = () => {
  return (
    <MainContainer isFlatList>
      <BackHeader HeadingContainerProps={{
        isSubHeadig: false
      }} heading="Staff Updates" />
      <UpdatesSectionList
        data={notifications}
        onClearPress={(id: string) => {
          // throw new Error('Function not implemented.');
        }}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({});
