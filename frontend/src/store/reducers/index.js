import { combineReducers } from "redux";
import carsReducer from "./carsReducer";
import catReducer from "./catReducer";

export default combineReducers({
  carsList: carsReducer,
  catList: catReducer,
  
});
