import { actions } from "../actions/notificationActions";

const initialStore = {
  token: null,
  data: {
    message: null,
    type: null,
    roomId: null,
    from: null,
  },
  show: false,
};

export const notificationReducer = (
  store = initialStore,
  { type, payload }
) => {
  switch (type) {
    case actions.REGISTER_NOTIFICATIONS.NAME:
      return { ...store, token: payload };
    case actions.SHOW_NOTIFICATION.NAME:
      return { ...store, data: payload, show: true };
    case actions.HIDE_NOTIFICATION.NAME:
      return { ...store, data: initialStore.data, show: false };
    default:
      return store;
  }
};
