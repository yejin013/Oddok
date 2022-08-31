// Date 객체를 yyyy-mm-dd 형식의 문자열로 반환
function dateFormatting(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

export default dateFormatting;
