import React from "react";
import { Card } from "../../components/Card";
import { View, Text } from "react-native";
import { Connect } from "../../actions";

class TikkipokeriPlayer extends React.Component {
  myTurn() {
    if (
      this.props.game.turn !== this.props.user.id ||
      this.props.user.id !== this.props.player.id
    ) {
      return false;
    }
    return true;
  }

  isMe() {
    return this.props.user.id === this.props.player.id;
  }

  onClickCard({ player, card }) {
    if (this.myTurn()) {
      if (player.cardsChanged) {
        this.tableCard(card);
      } else {
        this.selectCard(card);
      }
    }
  }

  selectCard(card) {
    this.props.socket.emit("select card", card);
  }

  tableCard(card) {
    this.props.socket.emit("table card", card);
  }

  validateName(name) {
    if (name.includes("Bot")) {
      return "Bot";
    } else {
      return name;
    }
  }

  getWinner(player) {
    const { pokerWinner, tikkiWinner, land } = this.props.game;
    if (pokerWinner && tikkiWinner) {
      if (pokerWinner.id === player.id && tikkiWinner.id === player.id) {
        return `Pokeri ja tikki (+${pokerWinner.hand.points}p), (+2p)`;
      } else if (pokerWinner.id === player.id) {
        return `Pokerivoitto (+${pokerWinner.hand.points}p)`;
      } else if (tikkiWinner.id === player.id) {
        return `Tikkivoitto (+2p)`;
      }
    }
  }

  render() {
    const { player, i, amount } = this.props;

    let rotation = 0;
    let color = "rgba(0,0,0,0.2)";
    let top, bottom, left, right, width, height, marginRight, marginLeft;
    switch (amount) {
      case 1:
      case 2:
        rotation = i * 180;
        switch (i) {
          case 0:
            bottom = 0;
            width = "40%";
            height = "40%";
            break;
          case 1:
            top = 0;
            width = "40%";
            height = "40%";
            break;
        }
        break;
      case 3:
      case 4:
        rotation = i * 90;
        switch (i) {
          case 0:
            bottom = 0;
            width = "40%";
            height = "40%";
            break;
          case 1:
            left = 0;
            width = "40%";
            height = "40%";
            marginLeft = "-6%";
            break;
          case 2:
            top = 0;
            width = "40%";
            height = "40%";
            break;
          case 3:
            right = 0;
            width = "40%";
            height = "40%";
            marginRight = "-6%";
            break;
        }
        break;
    }

    const styles = {
      player: {
        position: "absolute",
        top,
        left,
        right,
        bottom,
        margin: 0,
        width,
        height,
        backgroundColor: color,
        marginRight,
        marginLeft,
        transform: [{ rotate: `${rotation}deg` }],
      },
      info: {
        position: "absolute",
        bottom: 0,
        // right:-60,
        width: "100%",
        zIndex: 5,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "5%",
        paddingRight: "5%",
        // flex:0.2,
        // flexDirection:'row',
        // alignItems:'flex-start',
        backgroundColor:
          this.props.game.turn === player.id ? "#2079d8" : "rgba(0,0,0,0.5)",
      },
      name: {
        color: "white",
        // alignItems:'center',
        // justifyContent:'center'
      },
      points: {
        color: "white",
        alignItems: "flex-end",
      },
      cards: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
      },
      tableCard: {
        flex: 0.5,
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "center",
        zIndex: this.isMe() ? 0 : 2,
      },
      winner: {
        fontSize: 20,
        color: "yellow",
      },
    };

    const visibleCards = player.shouldRevealHand
      ? player.hand.hand
      : player.cards;
    return (
      <View style={styles.player}>
        <View style={styles.info}>
          {this.isMe() && <Text style={styles.points}>{player.hand.name}</Text>}
          <Text style={styles.name}>{this.validateName(player.name)}</Text>
          <Text style={styles.points}>Pisteet: {player.points}</Text>
        </View>

        {(!this.myTurn() || player.shouldRevealHand) && (
          <View style={styles.tableCard}>
            {player.shouldRevealHand ? (
              <View>
                <Text style={styles.winner}>{player.hand.name}</Text>
                <Text style={styles.winner}>{this.getWinner(player)}</Text>
              </View>
            ) : (
              player.firstTableCard && (
                <Card card={player.firstTableCard} table={true} />
              )
            )}
          </View>
        )}

        {(!this.myTurn() || player.shouldRevealHand) && (
          <View style={styles.cards}>
            {visibleCards.map((card) => (
              <Card
                key={card.id}
                hidden={
                  player.shouldRevealHand ? false : this.isMe() ? false : true
                }
                card={card}
              />
            ))}
          </View>
        )}
      </View>
    );
  }
}

export default Connect(TikkipokeriPlayer);
