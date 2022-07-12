import React from "react";
import { Connect } from "../../actions";

class Timer extends React.Component {
  state = {
    timeLeft: 0,
    turnEnds: 0,
    isRunning: false,
  };

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.setState({
      isRunning: true,
      turnEnds: this.props.timer.turnEnds,
    });

    this.timer = setInterval(() => {
      this.setState({
        timeLeft: this.state.turnEnds - new Date().getTime(),
        timePercentage: (this.state.timeLeft / this.props.timer.duration) * 100,
      });
    }, 1);
  }

  stopTimer() {
    this.setState({
      timeLeft: 0,
      turnEnds: 0,
      isRunning: false,
      timePercentage: 100,
    });
    clearInterval(this.timer);
  }

  render() {
    const timeNow = new Date().getTime();
    const { turnEnds } = this.props.timer;
    if (turnEnds && timeNow < turnEnds && !this.state.isRunning) {
      this.startTimer(turnEnds);
    }

    if (turnEnds && this.state.isRunning && this.state.timeLeft < 0) {
      this.props.socket.emit("miss turn");
      this.stopTimer();
    }
    return (
      <div
        style={{
          width: `${this.state.timePercentage}%`,
          height: 5,
          backgroundColor: "green",
          position: "absolute",
          top: 0,
        }}
      ></div>
    );
  }
}

export default Connect(Timer);
