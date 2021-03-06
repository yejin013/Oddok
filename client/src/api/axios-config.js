/* eslint-disable no-param-reassign */
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
  timeout: 30000,
  header: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => {
    console.log("πμλ΅ μ±κ³΅", res);
    return res.data;
  },
  (error) => {
    console.log("π΅μλ΅ μλ¬", error.response);
    const { config, response } = error;
    if (response.status === 401 && response.data.message === "λ‘κ·ΈμΈμ΄ λμ΄ μμ§ μμ΅λλ€.") {
      return axiosInstance(config); // μ€ν¨ν API μ¬μμ²­
    }
    throw error;
  },
);

export default axiosInstance;
