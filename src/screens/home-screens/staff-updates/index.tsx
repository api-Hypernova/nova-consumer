import {StyleSheet, Text, View} from 'react-native';
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
        type: 'New Appointment',
        time: '15:17',
        user: {
          name: 'Mike Tyson',
          message: 'You got a new appointment',
          avatar: Images.profileImg, // Replace with actual image URL
        },
      },
      {
        id: '2',
        type: 'Message',
        time: '15:01',
        user: {
          name: 'Derek Salon',
          message:
            'Please clear all dues before appointment. Please clear all dues before appointment.Please clear all dues before appointment',
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
        type: 'Studio booking on Jun 22, 2021 at 14:34',
        time: null,
        user: {
          name: 'Athletic Club Davina',
          message: 'Jl. Soekarno Hatta No.9 A, Jatimulyo',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '4',
        type: 'Studio booking on Jun 22, 2021 at 14:34',
        time: null,
        user: {
          name: 'Athletic Club Davina',
          message: 'Jl. Soekarno Hatta No.9 A, Jatimulyo',
          avatar: Images.hairCut, // Replace with actual image URL
        },
      },
      {
        id: '5',
        type: 'Studio booking on Jun 22, 2021 at 14:34',
        time: null,
        user: {
          name: 'Athletic Club Davina',
          message: 'Jl. Soekarno Hatta No.9 A, Jatimulyo',
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
