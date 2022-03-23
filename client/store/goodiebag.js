import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loggerMiddleware from "redux-logger";
import axios from "axios";

const goodiebagReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_GOODIEBAG":
      return action.goodiebags;
    case "CREATE_GOODIE":
      return [...state, action.newGoodie];
    case "DELETE_GOODIE":
      return state.filter((item) => item.id !== action.goodie.id);
    default:
      return state;
  }
};

const singleGoodieReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_GOODIE":
      return action.singleGoodie;
    default:
      return state;
  }
};

export const fetchSingleGoodie = (goodie) => {
  return async (dispatch) => {
    const singleGoodie = (await axios.get(`/api/goodiebag/${goodie.id}`)).data;
    dispatch({ type: "SET_GOODIE", singleGoodie });
  };
};

export const fetchGoodieBag = () => {
  return async (dispatch) => {
    const goodiebags = (await axios.get("/api/goodiebag")).data;
    dispatch({ type: "SET_GOODIEBAG", goodiebags });
  };
};

export const deleteGoodie = (goodie, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/goodiebag/${goodie.id}`);
    dispatch({ type: "DELETE_GOODIE", goodie });
    history.push("/");
  };
};

//data: newGoodie is aliasing
export const createGoodie = (goodie, history) => {
  return async (dispatch) => {
    const { data: newGoodie } = await axios.post("/api/goodiebag", goodie);
    dispatch({ type: "CREATE_GOODIE", newGoodie });
    history.push("/");
  };
};

const rootReducer = combineReducers({
  goodiebags: goodiebagReducer,
  goodie: singleGoodieReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, thunk)
);

export default store;
