function stringifyDate(date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date - offset).toISOString();
}

export default stringifyDate;
