import request from "api";

import * as actions from "./actions";

function register(values, { setSubmitting, setStatus }) {
  return dispatch => {
    setStatus();
    request({
      url: "/register",
      method: "POST",
      data: values
    }).then(({ status, data }) => {
      setSubmitting(false);
      if (status === 200) {
        dispatch(actions.registerOk(data));
      } else {
        setStatus(data);
      }
    });
  };
}

function login(values, { setSubmitting, setStatus }) {
  return dispatch => {
    setStatus();
    request({
      url: "/login",
      method: "POST",
      data: values
    }).then(({ status, data }) => {
      setSubmitting(false);
      if (status === 200) {
        dispatch(actions.loginOk(data));
      } else {
        setStatus(data);
      }
    });
  };
}

function auth() {
  return dispatch => {
    request({
      url: "/auth"
    }).then(({ status, data }) => {
      if (status === 200) {
        dispatch(actions.authOk(data));
      }
    });
  };
}

function logout() {
  return dispatch => {
    request({
      url: "/logout"
    }).then(({ status, data }) => {
      if (status === 200) {
        dispatch(actions.logoutOk());
      }
    });
  };
}

export { register, login, auth, logout };
