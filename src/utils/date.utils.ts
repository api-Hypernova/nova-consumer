import moment from 'moment';
export enum apiDateTimeFormat {
  ISODate = 'YYYY-MM-DD',
  TimeWithOutSeconds = 'LT',
  ClientDate = 'MM/DD/YYYY',
  ReverseDate = 'YYYY/MM/DD',
  DateTimeDuration = 'YYYY-DD-MM  H:mm:ss',
  DateTimeDurationWithoutSeconds = 'YYYY-DD-MM  H:mm',
  DateTimeApiBody = 'MM/DD/YYYY HH:mm:ss',
  HoursTime = 'h:mm a',
  Hours24 = 'HH:mm',
}

const getDateTimeFormat = (date: Date | string, format?: apiDateTimeFormat) => {
  const effectiveFormat =
    format ?? apiDateTimeFormat.ClientDate ?? apiDateTimeFormat;
  return moment(date).format(effectiveFormat);
};

export const formatedDateTime = (date: Date, time: Date) => {
  return (
    getDateTimeFormat(date, apiDateTimeFormat['ISODate']) +
    ' ' +
    getDateTimeFormat(time, apiDateTimeFormat['Hours24'])
  );
};

export const timeHumanize = (time: string): string => {
  const now = moment();
  const thatTime = moment(time);

  // Calculate the difference in various time units
  const diffInSeconds = now.diff(thatTime, 'seconds');
  const diffInMinutes = now.diff(thatTime, 'minutes');
  const diffInHours = now.diff(thatTime, 'hours');
  const diffInDays = now.diff(thatTime, 'days');
  const diffInMonths = now.diff(thatTime, 'months');
  const diffInYears = now.diff(thatTime, 'years');

  // Handle different time ranges
  if (diffInSeconds < 60) {
    return `just now`;
  } else if (diffInMinutes < 60) {
    return diffInMinutes === 1
      ? '1 minute ago'
      : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  } else if (diffInMonths < 12) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  } else {
    return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
  }
};

export const calculateTimeDifference = (
  startTime: string,
  endTime: string,
): string => {
  const start = moment(startTime, 'HH:mm');
  const end = moment(endTime, 'HH:mm');

  // Handle cases where the end time is before start time (crossing midnight)
  if (end.isBefore(start)) {
    end.add(1, 'day');
  }

  // Calculate the difference in duration
  const duration = moment.duration(end.diff(start));

  const hours = duration.hours();
  const minutes = duration.minutes();

  // Return formatted result
  if (hours > 0 && minutes > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''} ${minutes} min${
      minutes > 1 ? 's' : ''
    }`;
  } else if (hours > 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  } else {
    return `${minutes} min${minutes > 1 ? 's' : ''}`;
  }
};

export default {
  getDateTimeFormat,
  apiDateTimeFormat,
};
