import moment from 'moment';

export const convertFirestoreDateToString = (date) => {
  const time = date.seconds * 1000 + Math.round(date.nanoseconds / 1e6);

  return moment(time).format('DD/MM/YYYY');
};

export const convertFirestoreDateToDate = (date) => {
  const time = date.seconds * 1000 + Math.round(date.nanoseconds / 1e6);

  return new Date(time);
};
