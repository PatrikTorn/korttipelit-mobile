import { combineReducers } from "redux";
import { commonReducer } from "./commonReducer";
import { gameReducer } from "./gameReducer";
import { userReducer } from "./userReducer";
import openSocket from "socket.io-client";
import { notificationReducer } from "./notificationReducer";
import axios from "axios";
import { ENDPOINT } from "../constants";
console.log("!!");
axios
  .get(`${ENDPOINT}/players`)
  .then((res) => console.log("SUCCESS", res))
  .catch((e) => console.log("ERR", e));
const socketReducer = openSocket(ENDPOINT, {});
const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  common: commonReducer,
  notification: notificationReducer,
  socket: () => socketReducer,
});

export default rootReducer;
