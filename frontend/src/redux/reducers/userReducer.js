import {
  //Register
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,

  //Login
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGOUT,
} from "../../constants/userconstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        message: action.payload.message,
      };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return { userInfo: state.userInfo };

    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        message: action.payload.message,
      };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_RESET:
      return { userInfo: state.userInfo };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
