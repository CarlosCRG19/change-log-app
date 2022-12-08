const convertDatetimeToDateString = (datetime) => {
  const date = new Date(datetime);

  return date.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'long' });
};

export default convertDatetimeToDateString;
