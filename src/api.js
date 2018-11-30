import axios from "axios";

const client = axios.create({
  baseURL: process.env["REACT_APP_API_BASE"],
  withCredentials: true
});

export default function request(options) {
  const onSuccess = res => {
    return res;
  };
  const onError = err => {
    return err.response;
  };
  return client(options)
    .then(onSuccess)
    .catch(onError);
}
