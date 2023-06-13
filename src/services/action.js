import { api } from "../utils/api";

export const SET_USER = "SET_USER";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch) => {
    return api.getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const login = () => {
  return (dispatch) => {
    return api.login().then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
    });
  };
};
