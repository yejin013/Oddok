import axios from "axios";

export const getPopluarHashtag = async () => {
  const response = await axios.get("/hashtag/popular");
  return response;
};
