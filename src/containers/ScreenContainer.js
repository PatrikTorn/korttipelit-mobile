import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Connect } from "../actions";
import AuthNavigator from "../navigators/AuthNavigator";
import LobbyNavigator from "../navigators/LobbyNavigator";
import Game from "./Game/Game";
import Test from "./Test";
const TEST_GAME = false;

class ScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    const socket = this.props.socket;
    socket.on("disconnect", (reason) => {
      alert("dis1");
    });
    socket.on("disconnected", (reason) => {
      alert("dis2");
    });
    socket.on("get rooms", (rooms) => this.props.setRooms(rooms));
    socket.on("get sockets", (sockets) => this.props.setSockets(sockets));
    socket.on("get socket", (user) => this.props.setUser(user));
    socket.on("get game", (game) => this.props.setGame(game));
    socket.on("reset game", () => this.props.resetGame());
    console.log(this.props);
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
    if (TEST_GAME) {
      return <Test />;
    }
  }
}

export default Connect(ScreenContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});
