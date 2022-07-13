import React from "react";
import { Connect } from "../../actions";
import { Card, Table, Timer } from "../../components";
import { SOCKET_SERVER_ACTIONS } from "../../constants";
import "./Game.css";
class Paskahousu extends React.Component {
  myTurn(player) {
    if (
      this.props.game.turn !== this.props.user.id ||
      this.props.user.id !== player.id
    ) {
      return false;
    }
    return true;
  }

  changeCards(player) {
    const cards = player.cards.filter((card) => card.selected);
    this.props.socket.emit(
      SOCKET_SERVER_ACTIONS.PASKAHOUSU.CHANGE_CARDS,
      cards
    );
  }

  takeCard(player) {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.PASKAHOUSU.TAKE_CARD);
  }

  takeTable(player) {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.PASKAHOUSU.TAKE_TABLE);
  }

  onClickCard({ player, card }) {
    if (!this.myTurn(player)) return null;
    this.selectCard(card);
  }

  selectCard(card) {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.PASKAHOUSU.CLICK_CARD, card);
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
    const { turn, timer, firstTableCard, table, trash, cards } =
      this.props.game;
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
            <div className="info" id={turn === player.id && "isTurn"}>
              <span class="name">{player.name}</span>
              <span className="points">Pisteet {player.points}</span>
            </div>
            <div className="changeCards">
              {firstTableCard && (
                <Card
                  data={firstTableCard}
                  visible={true}
                  onClick={() => console.log("ASD")}
                />
              )}
              {this.myTurn(player) && (
                <div>
                  {player.cards.filter((c) => c.selected).length > 0 && (
                    <button
                      onClick={() =>
                        this.myTurn(player) && this.changeCards(player)
                      }
                    >
                      Vaihda
                    </button>
                  )}
                  {!player.cardTaken && (
                    <button
                      onClick={() =>
                        this.myTurn(player) && this.takeCard(player)
                      }
                    >
                      Nosta pakasta
                    </button>
                  )}
                  {table.length > 0 && (
                    <button
                      onClick={() =>
                        this.myTurn(player) && this.takeTable(player)
                      }
                    >
                      Nosta pöytä
                    </button>
                  )}
                </div>
              )}
              Pakka: {cards.length}
              Pöytä: {table.length}
            </div>
            }
          </div>
        ))}
        {/* {firstTableCard && <div className="tableCenter"><Card data={firstTableCard} visible={true} onClick={() => console.log("ASD")}/></div>} */}
      </Table>
    );
  }
}

export default Connect(Paskahousu);
