import {
  //Todo
  TODO_REQUEST,
  TODO_SUCCESS,
  TODO_FAIL,

  //Add Todo
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAIL,
  TODO_ADD_SUCCESS,

  //Delete
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_DELETE_FAIL,

  //Edit
  TODO_EDIT_REQUEST,
  TODO_EDIT_SUCCESS,
  TODO_EDIT_FAIL,
} from "../../constants/todoconstant";
import baseService from "../service/baseService";

// All Todo
export const allTodo = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TODO_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseService.get("/todos", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: TODO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TODO_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

//Add Todo
export const addTodo = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_TODO_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const response = await baseService.post("/todos", formData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: ADD_TODO_SUCCESS });
    dispatch({ type: TODO_ADD_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: ADD_TODO_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

//Delete
export const todoDelete = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: TODO_DELETE_REQUEST });

    const { data } = await baseService.delete(`/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: TODO_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TODO_DELETE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

//Update
export const updateTodo = (id, formData) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: TODO_EDIT_REQUEST });
    const { data } = await baseService.patch(`/todos/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: TODO_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TODO_EDIT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
