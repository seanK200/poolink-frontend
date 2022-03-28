import { isDate, isISO8601 } from 'validator';

const timeString = {
  ko: {
    now: '지금',
    before: '전',
    after: '후',
    singular: {
      second: '초',
      minute: '분',
      hour: '시간',
      day: '일',
      month: '개월',
      year: '년',
    },
    plural: {
      second: '',
      minute: '',
      hour: '',
      day: '',
      month: '',
      year: '',
    },
    numsep: '',
  },
  en: {
    now: 'Just now',
    before: 'ago',
    after: 'later',
    singular: {
      second: 'second',
      minute: 'minute',
      hour: 'hour',
      day: 'day',
      month: 'month',
      year: 'year',
    },
    plural: {
      second: 's',
      minute: 's',
      hour: 's',
      day: 's',
      month: 's',
      year: 's',
    },
    numsep: ' ',
  },
};

// millisecond = 1
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 12 * MONTH;

export function getPrettyTimeDiff(dateString, lang = 'ko') {
  // on error return untouched
  if (!isISO8601(dateString) && !isDate(dateString)) return dateString;

  // calculate diff
  const current = new Date();
  const time = new Date(dateString);
  let diff = current - time;

  const { now, before, after, numsep, singular, plural } = timeString[lang];

  const negative = diff < 0;
  if (negative) diff *= -1;

  let num = 0;
  let unit = '';

  if (diff < SECOND) {
    return now;
  } else if (diff < MINUTE) {
    num = Math.floor(diff / SECOND);
    unit = 'second';
  } else if (diff < HOUR) {
    num = Math.floor(diff / MINUTE);
    unit = 'minute';
  } else if (diff < DAY) {
    num = Math.floor(diff / HOUR);
    unit = 'hour';
  } else if (diff < MONTH) {
    num = Math.floor(diff / DAY);
    unit = 'day';
  } else if (diff < YEAR) {
    num = Math.floor(diff / MONTH);
    unit = 'month';
  } else {
    num = Math.floor(diff / YEAR);
    unit = 'year';
  }
  unit = singular[unit] + (num > 1 ? plural[unit] : '');

  return `${num}${numsep}${unit} ${negative ? after : before}`;
}
