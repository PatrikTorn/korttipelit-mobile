import { actions } from "../actions/gameActions";
import { actions as userActions } from "../actions/userActions";
import { points } from "../tools/gameTools";
const initialStore = {
  players: [],
  cards: [],
  trash: [],
  deck: [],
  name: null,
  turn: null,
  tikkiWinner: {},
  pokerWinners: [],
  points,
};

export const gameReducer = (store = initialStore, { type, payload }) => {
  switch (type) {
    case actions.SET_GAME.NAME:
      return { ...store, ...payload };
    case actions.RESET_GAME.NAME:
    case userActions.LOGOUT.NAME:
      return initialStore;
    default:
      return store;
  }
};
