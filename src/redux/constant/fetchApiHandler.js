import axios from "axios";

export const sendRequest = (
  url,
  method,
  data,
  params,
  headers = {}
) => {
  const config = {
    url,
    method,
    data,
    headers,
    params,
  };
  return axios.request(config);
};
