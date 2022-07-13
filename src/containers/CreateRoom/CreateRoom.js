import React from "react";
import "./CreateRoom.css";
import { Button, Input } from "../../components";
import { RoomType } from "../../types";
export default class CreateRoom extends React.Component {
  state = {
    gameType: RoomType.Tikkipokeri,
    playersAmount: 2,
    bet: 50,
    pointLimit: 10,
    name: null,
  };

  render() {
    return (
      <center style={{ color: "white" }}>
        <Input
          onChange={(name) => this.setState({ name })}
          placeholder="Huoneen nimi"
        />
        <Button onClick={() => this.props.onClick(this.state)}>
          Luo huone
        </Button>

        <div className="row">
          <i className="title">Peli:</i>{" "}
          {[RoomType.Paskahousu, RoomType.Tikkipokeri].map((game) => (
            <Button
              onClick={() => this.setState({ gameType: game })}
              active={this.state.gameType === game}
              key={game}
            >
              {game}
            </Button>
          ))}
        </div>

        <div className="row">
          <i className="title">Pelaajien määrä:</i>
          {[2, 3, 4, 5, 6].map((amount) => (
            <Button
              onClick={() => this.setState({ playersAmount: amount })}
              active={this.state.playersAmount === amount}
              key={amount}
            >
              {amount}
            </Button>
          ))}
        </div>

        {this.state.gameType === RoomType.Tikkipokeri && (
          <div>
            <div className="row">
              <i className="title">Panos:</i>{" "}
              {[20, 50, 100].map((bet) => (
                <Button
                  onClick={() => this.setState({ bet })}
                  active={this.state.bet === bet}
                  key={bet}
                >
                  {bet}
                </Button>
              ))}
            </div>
            <div className="row">
              <i className="title">Pisteitä voittoon:</i>
              {[5, 10, 15, 20, 30, 40].map((pointLimit) => (
                <Button
                  onClick={() => this.setState({ pointLimit })}
                  active={this.state.pointLimit === pointLimit}
                  key={pointLimit}
                >
                  {pointLimit}
                </Button>
              ))}
            </div>
          </div>
        )}
      </center>
    );
  }
}
