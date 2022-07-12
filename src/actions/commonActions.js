import { createActionPointers } from "../tools/actionTools";
import axios from "axios";
const ENDPOINT = "https://kortti.herokuapp.com";
export const actions = createActionPointers([
  `SET_ROOMS`,
  "SET_SOCKETS",
  "SET_FULL_SCREEN",
  "GET_PLAYERS",
]);

export const setRooms = (payload) => ({
  type: actions.SET_ROOMS.NAME,
  payload,
});

export const setSockets = (payload) => ({
  type: actions.SET_SOCKETS.NAME,
  payload,
});

export const setFullScreen = (isFullScreen) => ({
  type: actions.SET_FULL_SCREEN.NAME,
  payload: isFullScreen,
});

export const getPlayers = () => ({
  payload: axios.get(`${ENDPOINT}/players`),
  type: actions.GET_PLAYERS.NAME,
});
