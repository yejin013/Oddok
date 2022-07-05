function getDday(date) {
  const today = new Date(); // 현재 시간

  // D - n
  if (today < date) return `D - ${Math.ceil((date - today) / 1000 / 60 / 60 / 24)}`;

  // D - DAY
  const hourDiff = Math.floor((today - date) / 1000 / 60 / 60);
  if (hourDiff >= 0 && hourDiff < 24) return `D - DAY`;

  // D + n
  return `D + ${Math.floor((today - date) / 1000 / 60 / 60 / 24)}`;
}

export default getDday;
