import SD from './style.utils'; // SD == Screen Dimensions
import CommonUtils from './common.utils';
import DateUtils from './date.utils';
import {toast as Toast} from './toast.utils';
import FontSize from './fontsSize.utils';
import {handleError} from './error.utils';
import { handleHaptictFeedback } from './haptic.utils';

export * from './location.permission';
export {SD, CommonUtils, DateUtils, Toast, FontSize, handleError, handleHaptictFeedback};
