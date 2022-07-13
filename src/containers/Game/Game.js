import React from "react";
import { Connect } from "../../actions";
import { Table, Card, Button } from "../../components";
import TikkipokeriPlayer from "./TikkipokeriPlayer";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Menu from "./Menu";
import { SOCKET_SERVER_ACTIONS } from "../../constants";
// import {Card, Table, PointList, Timer} from '../../components';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.type = this.props.gameType;
    this.state = {
      showMenu: false,
    };
  }

  myTurn(player) {
    if (
      this.props.game.turn !== this.props.user.id ||
      this.props.user.id !== player.id
    ) {
      return false;
    }
    return true;
  }

  changeCards(me) {
    const cards = me.cards.filter((card) => card.selected);
    const name =
      this.type === "paskahousu"
        ? SOCKET_SERVER_ACTIONS.PASKAHOUSU.CHANGE_CARDS
        : SOCKET_SERVER_ACTIONS.TIKKIPOKERI.CHANGE_CARDS;
    this.props.socket.emit(name, cards);
  }

  takeCard() {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.PASKAHOUSU.TAKE_CARD);
  }

  takeTable() {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.PASKAHOUSU.TAKE_TABLE);
  }

  getPlayers(players) {
    const myIndex = players.findIndex(
      (player) => player.id === this.props.user.id
    );
    const deletedPlayers = players.filter((p, i, s) => i >= myIndex);
    players.splice(myIndex, players.length - myIndex);
    players.splice(0, 0, ...deletedPlayers);
    return players;
  }

  createCenter(me) {
    const {
      land,
      tikkiStarted,
      tikkiRoundWinner,
      pokerWinner,
      tikkiWinner,
      gameWinner,
      moneyExchange,
      players,
    } = this.props.game;
    if (!me.cardsChanged && me.isTurn)
      return <Button title="Vaihda" onPress={() => this.changeCards(me)} />;
    const currentLand = {
      icon: ["♠", "♣", "♥", "♦"][["S", "C", "H", "D"].indexOf(land)],
      color: ["S", "C", "H", "D"].indexOf(land) > 1 ? "red" : "black",
    };
    if (gameWinner && moneyExchange) {
      return <Text style={styles.text}>Pelin voitti {gameWinner.name}</Text>;
    }
    if (land && tikkiStarted) {
      return <Text style={styles.land(currentLand)}>{currentLand.icon}</Text>;
    } else if (tikkiRoundWinner && !land) {
      return (
        <Text style={styles.text}>
          Tikkikierroksen voitti{" "}
          {this.props.game.players.find((p) => p.id === tikkiRoundWinner).name}
        </Text>
      );
    }
    return null;
  }

  createSelect(player) {
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
        {player.cards.map((card, i) => (
          <Card
            card={card}
            i={i}
            select={true}
            key={card.id}
            onPress={() => this.onClickCard({ player, card })}
          />
        ))}
      </ScrollView>
    );
  }

  onClickCard({ player, card }) {
    if (this.type === "paskahousu") {
      this.props.socket.emit(SOCKET_SERVER_ACTIONS.PASKAHOUSU.TAKE_CARD, card);
    } else {
      if (player.cardsChanged) {
        this.tableCard(card);
      } else {
        this.selectCard(card);
      }
    }
  }

  selectCard(card) {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.TIKKIPOKERI.SELECT_CARD, card);
  }

  tableCard(card) {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.TIKKIPOKERI.TABLE_CARD, card);
  }

  render() {
    const { game } = this.props;
    const players = this.getPlayers(game.players);
    const me = players.find((p) => p.id === this.props.user.id);

    const Player = ({ player, i }) => {
      switch (this.type) {
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
    //     {player.cards.filter(c => c.selected).length > 0 && <button onClick={() => this.myTurn(player) && this.changeCards(player)}>Vaihda</button>}
    //     {!player.cardTaken && <button onClick={() => this.myTurn(player) && this.takeCard(player)}>Nosta pakasta</button>}
    //     {table.length > 0 && <button onClick={() => this.myTurn(player) && this.takeTable(player)}>Nosta pöytä</button>}

    const GameActions = () => {
      const cardsSelected = me.cards.filter((c) => c.selected).length > 0;
      switch (this.type) {
        case "paskahousu":
          return (
            <View style={styles.centerRow}>
              <View style={{ flex: 0.25 }}>
                {game.turn === me.id &&
                  (cardsSelected ? (
                    <Button title="Lyö" onPress={() => this.changeCards(me)} />
                  ) : (
                    !me.cardTaken && (
                      <Button
                        title="Nosta pakasta"
                        onPress={() => this.takeCard()}
                      />
                    )
                  ))}
              </View>
              <View style={{ flex: 0.25, alignItems: "center" }}>
                {game.firstTableCard && (
                  <Card card={game.firstTableCard} center={true} />
                )}
              </View>
              <View style={{ flex: 0.25 }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  {(game.cards || []).map((c, i) => (
                    <Card card={c} i={i} hiddenCenter={true} />
                  ))}
                </View>
              </View>
              <View style={{ flex: 0.25 }}>
                {this.myTurn(me) && game.table.length > 0 && (
                  <Button
                    title="Nosta pöytä"
                    onPress={() => this.takeTable()}
                  />
                )}
              </View>
            </View>
          );
        default:
          return this.createCenter(me);
      }
    };

    return (
      <Table>
        <View style={styles.center}>
          <GameActions />
        </View>
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
        {this.props.game.turn === this.props.user.id &&
          this.createSelect(players[0])}
        {players.map((player, i) => (
          <Player player={player} i={i} key={player.id} />
        ))}
      </Table>
    );
  }
}

export default Connect(Game);

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
  text: {
    color: "white",
    fontSize: 25,
  },
  land: (currentLand) => ({
    color: currentLand.color,
    fontSize: 35,
  }),
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
};
