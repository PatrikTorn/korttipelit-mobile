import { combineReducers } from 'redux';
import {commonReducer} from './commonReducer';
import {gameReducer} from './gameReducer';
import {userReducer} from './userReducer';
import openSocket from 'socket.io-client';
import { notificationReducer } from './notificationReducer';
const PROD = true;
const ENDPOINT = PROD ? `https://kortti.herokuapp.com` : `http://localhost:4000`;
const socketReducer = openSocket(ENDPOINT, {forceNew:false});
const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    common: commonReducer,
    notification: notificationReducer,
    socket: () => socketReducer
});

export default rootReducer;