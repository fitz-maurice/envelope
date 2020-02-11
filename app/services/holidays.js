import {
  getString,
  setString,
  getNumber,
  setNumber,
} from 'tns-core-modules/application-settings';
import moment from 'moment';

const holidayKey = 'holidays';
const holidayDate = 'holidayDate';

export const fetchHolidays = async () => {
  const setDate =
    getNumber(holidayDate) ||
    moment()
      .subtract(8, 'days')
      .unix();
  const expiration = moment()
    .subtract(7, 'days')
    .unix();

  if (moment(setDate).isBefore(expiration)) {
    const response = await fetch('https://envelope.app/endpoint/holidays.json');
    const { holidays } = await response.json();
    setString(holidayKey, JSON.stringify(holidays));
    setNumber(holidayDate, moment().unix());
    return holidays;
  } else {
    return JSON.parse(getString(holidayKey));
  }
};
