import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { sortPlayers } from "../../tools/gameTools";
import { Connect } from "../../actions";
import { SOCKET_SERVER_ACTIONS } from "../../constants";

class Menu extends React.Component {
  state = {
    menuScreen: 1,
  };

  exitGame() {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.ROOM.EXIT_GAME);
  }

  render() {
    const players = sortPlayers({
      players: this.props.game.players,
      user: this.props.user,
    });
    return (
      <View style={styles.menuWrapper}>
        <View style={styles.menuContainer}>
          <View style={styles.menuNav}>
            <TouchableOpacity onPress={() => this.setState({ menuScreen: 2 })}>
              <Text style={styles.text}>Pistelista</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ menuScreen: 1 })}>
              <Text style={styles.text}>Rahatilanne</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.exitGame()}>
              <Text style={styles.text}>Poistu pelistä</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuContent}>
            {this.state.menuScreen === 1 &&
              players.map((player) => (
                <View key={player.id}>
                  <Text style={styles.text}>
                    {player.name}: {player.points}p{" "}
                  </Text>
                </View>
              ))}
            {this.state.menuScreen === 2 &&
              this.props.game.points.map((hand) => (
                <View key={hand.name}>
                  <Text style={styles.text}>
                    {hand.name}: {hand.points}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  menuWrapper: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    flex: 0.6,
    height: "100%",
    flexDirection: "column",
  },
  menuNav: {
    flex: 0.1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  menuContent: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
};

export default Connect(Menu);
