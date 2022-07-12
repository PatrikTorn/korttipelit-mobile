import { createActionPointers } from "../tools/actionTools";

export const actions = createActionPointers([`SET_GAME`, "RESET_GAME"]);

export const setGame = (payload) => ({
  type: actions.SET_GAME.NAME,
  payload,
});

export const resetGame = () => ({
  type: actions.RESET_GAME.NAME,
});
