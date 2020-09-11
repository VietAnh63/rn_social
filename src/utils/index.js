import moment from 'moment';

export const processImageUrl = (url) => {
  const str = url;
  const linkImage = str.split('/');
  return 'http://social.hungvu.net/' + linkImage[1];
};

export const processDate = (date) => {
  return moment(date).format('hh:mm DD/MM/YYYY');
};
