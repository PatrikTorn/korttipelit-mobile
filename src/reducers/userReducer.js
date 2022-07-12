import { actions } from "../actions/userActions";

const initialStore = {
  cards: [],
  id: null,
  room: {
    type: null,
    id: null,
    name: null,
  },
  name: null,
};

export const userReducer = (store = initialStore, { type, payload }) => {
  switch (type) {
    case actions.SET_USER.NAME:
      return { ...store, ...payload };
    case actions.LOGOUT.NAME:
      return initialStore;
    default:
      return store;
  }
};
