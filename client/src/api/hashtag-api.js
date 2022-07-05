import axios from "axios";

export const getPopluarHashtag = async (name) => {
  const query = name ? `?name=${name}` : "";
  const response = await axios.get(`/hashtag/popular${query}`);
  return response;
};
