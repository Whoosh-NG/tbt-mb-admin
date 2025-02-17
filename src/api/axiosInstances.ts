import Cookies from "js-cookie";
import axios from "axios";

const baseUrl = "https://api.tbt.live.whooshing.xyz/api/v1";
// const baseUrl = "https://tbt-agro.whooshing.xyz/api/v1";

const baseAPI = axios.create({ baseURL: baseUrl });

baseAPI.interceptors.request.use(async (config) => {
  const userToken = Cookies.get("whooshNgToken");
  // If userToken exists, set 'Authorization' and 'x-access-token' headers to the user token
  if (userToken) {
    config.headers["Authorization"] = `Bearer ${userToken}`;
    config.headers["x-access-token"] = userToken;
  }

  return config;
});

export default baseAPI;
