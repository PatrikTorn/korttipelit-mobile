import { combineReducers } from "redux";
import { commonReducer } from "./commonReducer";
import { gameReducer } from "./gameReducer";
import { userReducer } from "./userReducer";
import openSocket from "socket.io-client";
import { notificationReducer } from "./notificationReducer";
import { ENDPOINT } from "../constants";

const socketReducer = openSocket(ENDPOINT, {});
const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  common: commonReducer,
  notification: notificationReducer,
  socket: () => socketReducer,
});

export default rootReducer;
