import { Permissions, Notifications } from "expo";
import { createActionPointers } from "../tools/actionTools";
import { AsyncStorage } from "react-native";

export const actions = createActionPointers([
  `REGISTER_NOTIFICATIONS`,
  `SHOW_NOTIFICATION`,
  `HIDE_NOTIFICATION`,
]);

export const showNotification = ({ data }) => ({
  type: actions.SHOW_NOTIFICATION.NAME,
  payload: data,
});

export const hideNotification = () => ({
  type: actions.HIDE_NOTIFICATION.NAME,
});

export const registerNotifications = () => async (dispatch, getState) => {
  const socket = getState().socket;
  // const tok = await AsyncStorage.getItem('notificationToken');
  if (false) {
    return dispatch({
      type: actions.REGISTER_NOTIFICATIONS.NAME,
      payload: tok,
    });
  } else {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        return;
      }
    }
    const token = await Notifications.getExpoPushTokenAsync();
    socket.emit("set notification token", token);
    this.subscription = Notifications.addListener((n) =>
      dispatch(showNotification(n))
    );
    dispatch({
      type: actions.REGISTER_NOTIFICATIONS.NAME,
      payload: token,
    });
  }
};

export const sendNotification = ({ to, title, body, type, roomId, from }) => {
  return fetch("https://exp.host/--/api/v2/push/send", {
    body: JSON.stringify({
      to,
      title,
      body,
      data: {
        message: `${title} - ${body}`,
        type,
        roomId,
        from,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
};
