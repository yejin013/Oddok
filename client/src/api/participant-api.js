import axios from "axios";

export const getTotalParticipant = async () => {
  const response = await axios.get("/participant/count");
  return response;
};
