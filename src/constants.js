import Constants from "expo-constants";
const { manifest } = Constants;

const LOCAL_ENDPOINT_PORT = 4000;
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
