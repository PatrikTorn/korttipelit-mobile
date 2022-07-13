import { createActionPointers } from "../tools/actionTools";
import { AsyncStorage } from "react-native";
import { SOCKET_SERVER_ACTIONS } from "../constants";

export const actions = createActionPointers([`SET_USER`, "LOGOUT"]);

export const setUser = (payload) => ({
  type: actions.SET_USER.NAME,
  payload,
});

export const logout = () => ({
  type: actions.LOGOUT.NAME,
});

export const login =
  ({ name, password, fbId }) =>
  (dispatch, getState) => {
    const socket = getState().socket;
    if (name) {
      if (fbId) {
        AsyncStorage.setItem("fbId", fbId);
      } else {
        AsyncStorage.setItem("name", name);
      }
      socket.emit(SOCKET_SERVER_ACTIONS.AUTH.LOGIN, { name, password, fbId });
    }
  };
