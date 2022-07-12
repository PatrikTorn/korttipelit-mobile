import React from "react";
import { Button, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Table, Card } from "../components";
import TikkipokeriPlayer from "./Game/TikkipokeriPlayer";
import Menu from "./Game/Menu";
import { sortPlayers } from "../tools/gameTools";
import { Connect } from "../actions";
import game from "./game4.json";
class Test extends React.Component {
  state = {
    showMenu: false,
    menuScreen: 1,
  };

  exitGame() {
    this.props.socket.emit("join room", "lobby");
  }

  changeCards() {
    const me = game.players[0];
    const cards = me.cards.filter((card) => card.selected);
    this.props.socket.emit("change cards", cards);
  }
  createSelect(cards) {
    return (
      <ScrollView
        horizontal={true}
        style={{
          position: "absolute",
          bottom: "5%",
          width: "50%",
          zIndex: 10,
          paddingLeft: 20,
          height: "35%",
        }}
      >
        {cards.map((card, i) => (
          <Card card={card} select={true} i={i} />
        ))}
      </ScrollView>
    );
  }

  render() {
    const Player = ({ player, i, amount, type }) => {
      switch (type) {
        case "paskahousu":
          return (
            <TikkipokeriPlayer player={player} i={i} amount={players.length} />
          );
        default:
          return (
            <TikkipokeriPlayer player={player} i={i} amount={players.length} />
          );
      }
    };

    const GameActions = ({ type }) => {
      switch (type) {
        case "paskahousu":
          return (
            <View style={styles.centerRow}>
              <View style={{ flex: 0.3 }}>
                <Button title="Lyö" onPress={() => console.log("asd")} />
              </View>
              <View style={{ flex: 0.4, alignItems: "center" }}>
                <Card card={game.cards[0]} center={true} />
              </View>
              <View style={{ flex: 0.3 }}>
                <Button
                  title="Nosta pöytä"
                  onPress={() => console.log("asd")}
                />
              </View>
            </View>
          );
        default:
          return <Button title="Vaihda" onPress={() => console.log("asd")} />;
      }
    };
    const { user } = this.props;
    const players = sortPlayers({
      players: game.players,
      user: game.players[1],
    });
    // const leader = players.
    const type = "paskahousu";
    return (
      <Table>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => this.setState({ showMenu: !this.state.showMenu })}
        >
          {this.state.showMenu ? (
            <Text style={styles.menuText}>X</Text>
          ) : (
            <Text style={styles.menuText}>&#9776;</Text>
          )}
        </TouchableOpacity>
        {this.state.showMenu && <Menu />}
        <View style={styles.center}>
          <GameActions type={type} />
        </View>
        {this.createSelect(players[0].cards)}
        {players.map((player, i) => (
          <Player
            player={player}
            i={i}
            key={i}
            amount={players.length}
            type={type}
          />
        ))}
      </Table>
    );
  }
}

const styles = {
  center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "50%",
    height: "20%",
    zIndex: 3,
  },
  centerRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    left: 5,
    width: 45,
    height: 45,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 5,
    zIndex: 101,
  },
  menuText: {
    color: "white",
    fontSize: 30,
  },
  text: {
    color: "white",
  },
};

export default Connect(Test);
