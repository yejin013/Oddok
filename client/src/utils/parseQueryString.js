const parseQueryString = (url) => {
  const [_, query] = url.split("?");
  const queryList = query.split("&").reduce((acc, current) => {
    const [key, value] = current.split("=");
    return { ...acc, [key]: value };
  }, {});
  return queryList;
};

export default parseQueryString;
