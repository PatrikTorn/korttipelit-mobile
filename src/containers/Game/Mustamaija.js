import React from "react";
import { Connect } from "../../actions";
import { Card, Table, Timer } from "../../components";
import "./Game.css";
class Mustamaija extends React.Component {
  state = {
    selectedTableCard: {},
  };
  myTurn(player) {
    if (
      this.props.game.turn.id !== this.props.user.id ||
      this.props.user.id !== player.id
    ) {
      return false;
    }
    return true;
  }

  changeCards(player) {
    const cards = player.cards.filter((card) => card.selected);
    this.props.socket.emit("MM change cards", cards);
  }

  takeCard(player) {
    this.props.socket.emit("PH take card");
  }

  takeTable(player) {
    this.props.socket.emit("PH take table");
  }

  onClickCard({ player, card }) {
    if (!this.myTurn(player)) return null;
    this.selectCard(card);
  }

  selectCard(card) {
    this.props.socket.emit("MM click card", card);
  }

  trashCards(cards) {
    this.props.socket.emit("MM trash card", {
      table: this.state.selectedTableCard,
      hand: null,
    }); //TODo
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

  selectTableCard(card) {
    this.setState({ selectedTableCard: card });
  }

  createCards(player) {
    return (
      <div
        className="cards"
        style={{ width: player.table.length === 0 && "90%" }}
      >
        {player.cards.map((card, i) => (
          <Card
            data={card}
            onClick={() => this.onClickCard({ player, card })}
            key={Math.random()}
            visible={player.id === this.props.user.id}
            i={i}
          />
        ))}
      </div>
    );
  }

  render() {
    const { turn, cards, table, landCard } = this.props.game;
    const players = this.getPlayers(this.props.game.players);
    return (
      <Table>
        {players.map((player, i) => (
          <div
            key={Math.random()}
            className="player"
            id={`p${i + 1}-${
              players.length % 2 === 1 ? players.length + 1 : players.length
            }`}
          >
            {this.createCards(player)}
            <div className="changeCards">
              {landCard && (
                <Card
                  data={landCard}
                  visible={true}
                  onClick={() => console.log("ASD")}
                />
              )}
              {table.map((card, i) => (
                <div
                  style={{
                    marginLeft: 40 * i,
                    border:
                      this.state.selectedTableCard.id === card.id &&
                      "4px solid red",
                  }}
                >
                  <Card
                    data={card}
                    visible={true}
                    key={card.id}
                    onClick={() => card.enabled && this.selectTableCard(card)}
                  />
                </div>
              ))}
              <button onClick={() => this.changeCards(player)}>Change</button>
            </div>
            <div className="info" id={turn.id === player.id && "isTurn"}>
              <span className="name">{player.name}</span>
              <span className="points">Pisteet {player.points}</span>
            </div>
            }
          </div>
        ))}
      </Table>
    );
  }
}

export default Connect(Mustamaija);
