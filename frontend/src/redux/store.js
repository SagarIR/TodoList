import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

//User Reducer
import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";

//Todo Reducer
import {
  AddReducer,
  AllReducer,
  DeleteReducer,
  EditReducer,
} from "./reducers/todoReducer";

const reducer = combineReducers({
  //User
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,

  //Todo
  userTodo: AllReducer,
  addTodo: AddReducer,
  deleteTodo: DeleteReducer,
  editTodo: EditReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(reducer, intialState, applyMiddleware(thunk));

export default store;
