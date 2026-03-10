import {ImageProps} from 'react-native';

export enum ShopDescriptionTab {
  Default = 'default',
  Services = 'popular',
  Packages = 'packages',
  Gallery = 'gallery',
  Reviews = 'reviews',
}
export type ServicesData = {
  id: number | string;
  title: string;
  subTitle: string;
  time?: string;
  source: ImageProps['source'];
  isSelected?: boolean;
};

export type SelectedItemsTypes = [
  {
    title: ShopDescriptionTab.Services;
    data: ServicesData[];
  },
  {
    title: ShopDescriptionTab.Packages;
    data: ServicesData[];
  },
];

export type ReviewsDataTypes = ServicesData & {
  rating: string;
};
