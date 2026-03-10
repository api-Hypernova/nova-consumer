import {ImageProps} from 'react-native';

export type AnalyticsCardTypes = {
  id: string;
  title: string;
  subTitle: string;
  icon: ImageProps['source'];
};

export type QuickMenuCardTypes = {
  id: string;
  title: string;
  bgImage: ImageProps['source'];
  onPress: () => void;
};

export type ServiceCardTypes = {
  id: string;
  title: string;
  bgImage: ImageProps['source'];
  location: string;
  rating: string;
  views: string;
};
