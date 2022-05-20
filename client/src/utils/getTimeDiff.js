/**
 * Date간의 시간차를 계산하여 hh:mm:ss 형태의 스트링으로 반환한다.
 * @param {Date} startTime
 * @param {Date} endTime
 * @return {string} hh:mm:ss
 */
function getTimeDiff(startTime, endTime) {
  const diff = endTime.getTime() - startTime.getTime();
  return new Date(diff).toISOString().slice(11, 19);
}

export default getTimeDiff;
