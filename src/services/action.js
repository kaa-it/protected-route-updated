import { setUser, setAuthChecked } from "./user";
import { api } from "../utils/api";

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
      dispatch(setAuthChecked(true));
    });
  };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
              .catch(() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  dispatch(setUser({}));
               })
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};


export const logout = () => {
  return (dispatch) => {
    return api.logout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};
