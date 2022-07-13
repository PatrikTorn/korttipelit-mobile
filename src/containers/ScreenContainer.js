import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Connect } from "../actions";
import { SOCKET_CLIENT_ACTIONS } from "../constants";
import AuthNavigator from "../navigators/AuthNavigator";
import LobbyNavigator from "../navigators/LobbyNavigator";
import Game from "./Game/Game";

class ScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    const socket = this.props.socket;
    socket.on(SOCKET_CLIENT_ACTIONS.DISCONNECT, (reason) =>
      this.notifyDisconnect()
    );
    socket.on(SOCKET_CLIENT_ACTIONS.GET_ROOMS, (rooms) =>
      this.props.setRooms(rooms)
    );
    socket.on(SOCKET_CLIENT_ACTIONS.GET_SOCKETS, (sockets) =>
      this.props.setSockets(sockets)
    );
    socket.on(SOCKET_CLIENT_ACTIONS.GET_SOCKET, (user) =>
      this.props.setUser(user)
    );
    socket.on(SOCKET_CLIENT_ACTIONS.GET_GAME, (game) =>
      this.props.setGame(game)
    );
    socket.on(SOCKET_CLIENT_ACTIONS.RESET_GAME, () => this.props.resetGame());
  }

  notifyDisconnect() {
    alert("Yhteys palvelimeen on katkennut. Käynnistä sovellus uudelleen.");
  }

  render() {
    if (!this.props.user.name) {
      return (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      );
    } else if (this.props.user.room.type) {
      if (this.props.user.room.type === "game") {
        return <Game gameType={this.props.user.room.gameType} />;
      } else
        return (
          <NavigationContainer>
            <LobbyNavigator />
          </NavigationContainer>
        );
    }
  }
}

export default Connect(ScreenContainer);
