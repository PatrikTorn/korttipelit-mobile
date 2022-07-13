import Constants from "expo-constants";
const { manifest } = Constants;

export const SOCKET_CLIENT_ACTIONS = {
  GET_GAME: "get game",
  GET_SOCKET: "get socket",
  GET_SOCKETS: "get sockets",
  RESET_GAME: "reset game",
  GET_ROOMS: "get rooms",
  DISCONNECT: "disconnect",
};

export const SOCKET_SERVER_ACTIONS = {
  AUTH: {
    SET_NAME: "set name",
    LOGIN: "login",
    REGISTER: "register",
    SET_NOTIFICATION_TOKEN: "set notification token",
  },
  ROOM: {
    JOIN_ROOM: "join room",
    EXIT_GAME: "exit game",
    CREATE_ROOM: "create room",
    PLAY_OFFLINE: "play offline",
  },
  GAME: {
    MISS_TURN: "miss turn",
  },
  PASKAHOUSU: {
    CLICK_CARD: "PH click card",
    CHANGE_CARDS: "PH change cards",
    TAKE_CARD: "PH take card",
    TAKE_TABLE: "PH take table",
  },
  TIKKIPOKERI: {
    CHANGE_CARDS: "change cards",
    SELECT_CARD: "select card",
    TABLE_CARD: "table card",
  },
  RECONNECT_ATTEMPT: "reconnect_attempt",
  DISCONNECT: "disconnect",
  CONNECTION: "connection",
};

const DEV =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev;

export const ENDPOINT = DEV
  ? "http://suomalaiset-korttipelit-server.loca.lt"
  : `https://kortti.herokuapp.com`;
// manifest.debuggerHost.split(`:`).shift().concat(`:${LOCAL_ENDPOINT_PORT}`)

// const PROD = false;

export const colors = {
  opacity: {
    blue: "rgba(35, 86, 239, 0.3)",
    black: "rgba(0,0,0,0.3)",
    white: "rgba(255,255,255,0.1)",
  },
  light: "lightgray",
  blue: "rgb(35, 86, 239)",
};
