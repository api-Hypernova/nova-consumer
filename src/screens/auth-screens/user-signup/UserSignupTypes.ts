import {AddBusinessDataEnums} from '../../../constants';

export type ComponentToRenderTypes = {
  isPrevFormAvailable: boolean;
  isNextFormAvailable: boolean;
  onPressBack: () => void;
  onPressNext: (body?: any) => void;
  ftFormData?: any;
  currentForm: AddBusinessDataEnums;
};

export type AddFormComponentMap = {
  [key in AddBusinessDataEnums]: React.FC<ComponentToRenderTypes>;
};

export type FormFlow = {
  nextForm: AddBusinessDataEnums | null;
  prevForm: AddBusinessDataEnums | null;
};

export type AddBusinessDataFlow = {
  [key in AddBusinessDataEnums]?: FormFlow;
};
