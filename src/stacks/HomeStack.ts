import {HomeRoutes} from '../constants';
import {
  BookingDetails,
  CalendarDetailsScreen,
  CompletedBookings,
  HomeTabar,
  MessageListingScreen,
  NewBookings,
  StaffManagement,
  UpdateProfile,
  ChatScreen,
  StaffActivityScreen,
  StaffUpdates,
  NotificationsScreen,
  ServicesListing,
  NearbySalon,
  TopRatedSalon,
  NewToNova,
  ShopDescription,
  SpecialtyTreatments,
  NearbySalonListing,
  SearchScreen,
  CheckOutScreen,
  OurSpecialistScreen,
  PaymentScreen,
  ProceedToCheckout,
  BookingCompleteScreen,
  LegalInfo,
  AddCard,
  FullImageView,
} from '../screens';

export type HomeParamList = {
  [HomeRoutes.HomeTabar]: undefined;
  [HomeRoutes.UpdateProfile]: undefined;
  [HomeRoutes.StaffManagement]: undefined;
  [HomeRoutes.NewBookings]: undefined;
  [HomeRoutes.CompletedBookings]: undefined;
  [HomeRoutes.BookingDetails]: undefined;
  [HomeRoutes.CalendarDetailsScreen]: undefined;
  [HomeRoutes.MessageListingScreen]: undefined;
  [HomeRoutes.ChatScreen]: undefined;
  [HomeRoutes.StaffActivity]: undefined;
  [HomeRoutes.StaffUpdates]: undefined;
  [HomeRoutes.NotificationsScreen]: undefined;
  [HomeRoutes.ServicesListing]: undefined;
  [HomeRoutes.NearbySalon]: undefined;
  [HomeRoutes.TopRatedSalon]: undefined;
  [HomeRoutes.NewToNova]: undefined;
  [HomeRoutes.ShopDescription]: undefined;
  [HomeRoutes.SpecialtyTreatments]: undefined;
  [HomeRoutes.NearbySalonListing]: undefined;
  [HomeRoutes.SearchScreen]: undefined;
  [HomeRoutes.CheckOutScreen]: undefined;
  [HomeRoutes.OurSpecialistScreen]: undefined;
  [HomeRoutes.PaymentScreen]: undefined;
  [HomeRoutes.BookingCompleteScreen]: undefined;
  [HomeRoutes.LegalInfo]: undefined;
  [HomeRoutes.AddCard]: undefined;
  [HomeRoutes.FullImageView]: undefined;
};

type HomeStackScreenPropType = {
  name: HomeRoutes;
  component: React.FC;
  options?: any;
};

export const HomeStack: HomeStackScreenPropType[] = [
  {
    name: HomeRoutes.HomeTabar,
    component: HomeTabar,
  },
  {
    name: HomeRoutes.UpdateProfile,
    component: UpdateProfile,
  },
  {
    name: HomeRoutes.StaffManagement,
    component: StaffManagement,
  },

  {
    name: HomeRoutes.NewBookings,
    component: NewBookings,
  },
  {
    name: HomeRoutes.CompletedBookings,
    component: CompletedBookings,
  },
  {
    name: HomeRoutes.BookingDetails,
    component: BookingDetails,
  },
  {
    name: HomeRoutes.CalendarDetailsScreen,
    component: CalendarDetailsScreen,
  },
  {
    name: HomeRoutes.MessageListingScreen,
    component: MessageListingScreen,
  },
  {
    name: HomeRoutes.ChatScreen,
    component: ChatScreen,
  },
  {
    name: HomeRoutes.StaffActivity,
    component: StaffActivityScreen,
  },
  {
    name: HomeRoutes.StaffUpdates,
    component: StaffUpdates,
  },
  {
    name: HomeRoutes.NotificationsScreen,
    component: NotificationsScreen,
  },
  {
    name: HomeRoutes.ServicesListing,
    component: ServicesListing,
  },

  {
    name: HomeRoutes.NearbySalon,
    component: NearbySalon,
  },
  {
    name: HomeRoutes.TopRatedSalon,
    component: TopRatedSalon,
  },
  {
    name: HomeRoutes.NewToNova,
    component: NewToNova,
  },
  {
    name: HomeRoutes.ShopDescription,
    component: ShopDescription,
  },
  {
    name: HomeRoutes.SpecialtyTreatments,
    component: SpecialtyTreatments,
  },
  {
    name: HomeRoutes.NearbySalonListing,
    component: NearbySalonListing,
  },
  {
    name: HomeRoutes.SearchScreen,
    component: SearchScreen,
  },
  {
    name: HomeRoutes.CheckOutScreen,
    component: CheckOutScreen,
  },
  {
    name: HomeRoutes.OurSpecialistScreen,
    component: OurSpecialistScreen,
  },
  {
    name: HomeRoutes.PaymentScreen,
    component: PaymentScreen,
  },
  {
    name: HomeRoutes.ProceedToCheckout,
    component: ProceedToCheckout,
  },
  {
    name: HomeRoutes.BookingCompleteScreen,
    component: BookingCompleteScreen,
    options: {
      gestureEnabled: false, // Disable swipe gestures for this screen
    },
  },
  {
    name: HomeRoutes.LegalInfo,
    component: LegalInfo,
  },
  {
    name: HomeRoutes.AddCard,
    component: AddCard,
  },
  {
    name: HomeRoutes.FullImageView,
    component: FullImageView,
  },
];
