import { actions } from "../actions/commonActions";

const initialStore = {
  rooms: [],
  sockets: [],
  players: [],
  isFullScreen: false,
};

export const commonReducer = (store = initialStore, { type, payload }) => {
  switch (type) {
    case actions.SET_ROOMS.NAME:
      return { ...store, rooms: payload };
    case actions.SET_SOCKETS.NAME:
      return { ...store, sockets: payload };
    case actions.SET_FULL_SCREEN.NAME:
      return { ...store, isFullScreen: payload };
    case actions.GET_PLAYERS.FULFILLED:
      return { ...store, players: payload.data };
    default:
      return store;
  }
};
