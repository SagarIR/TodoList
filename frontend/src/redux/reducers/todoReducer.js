import {
  //Todo
  TODO_REQUEST,
  TODO_SUCCESS,
  TODO_FAIL,

  //Add Todo
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAIL,
  ADD_TODO_RESET,
  TODO_ADD_SUCCESS,

  //Delete
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_DELETE_FAIL,

  //Edit
  TODO_EDIT_REQUEST,
  TODO_EDIT_SUCCESS,
  TODO_EDIT_FAIL,
  TODO_EDIT_RESET,
} from "../../constants/todoconstant";

//All Todo
export const AllReducer = (
  state = { loading: false, todoInfo: [], error: null },
  action
) => {
  switch (action.type) {
    case TODO_REQUEST:
      return { ...state, loading: true, error: null };
    case TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todoInfo: action.payload,
        error: null,
      };
    case TODO_FAIL:
      return { ...state, loading: false, error: action.payload };
    case TODO_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        todoInfo: [...state.todoInfo, action.payload],
        error: null,
      };
    default:
      return state;
  }
};

// Add Todo
export const AddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO_REQUEST:
      return { loading: true };
    case ADD_TODO_SUCCESS:
      return {
        loading: false,
        success: true,
        addtodoInfo: action.payload,
        message: action.payload.message,
      };
    case ADD_TODO_FAIL:
      return { loading: false, error: action.payload };
    case ADD_TODO_RESET:
      return {};
    default:
      return state;
  }
};

//Delete
export const DeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_DELETE_REQUEST:
      return { loading: true };
    case TODO_DELETE_SUCCESS:
      return { loading: false, deleteInfo: action.payload };
    case TODO_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Edit
export const EditReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_EDIT_REQUEST:
      return { loading: true };
    case TODO_EDIT_SUCCESS:
      return {
        loading: false,
        editInfo: action.payload,
        message: action.payload.message,
      };
    case TODO_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case TODO_EDIT_RESET:
      return { editInfo: state.editInfo };
    default:
      return state;
  }
};
