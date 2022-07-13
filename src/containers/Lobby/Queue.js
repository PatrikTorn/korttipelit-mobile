import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { Connect } from "../../actions";
import { Button, Container, Modal, PlayerList } from "../../components";
import { SOCKET_SERVER_ACTIONS } from "../../constants";

function sendNotification({ to, title, body, type, roomId, from }) {
  return fetch("https://exp.host/--/api/v2/push/send", {
    body: JSON.stringify({
      to,
      title,
      body,
      data: {
        message: `${title} - ${body} - ${from}`,
        type,
        roomId,
        from,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

class Queue extends React.Component {
  state = {
    showModal: false,
  };
  componentDidMount() {
    this.props.navigation.addListener("didBlur", () => this.leaveRoom());
  }

  leaveRoom() {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.ROOM.JOIN_ROOM, "lobby");
    this.props.navigation.navigate("Lobby");
  }

  playOffline() {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.ROOM.PLAY_OFFLINE);
  }

  loadPlayers() {
    this.setState({ showModal: true });
  }

  askPlayer(player, roomDetails) {
    sendNotification({
      to: player.notificationToken,
      title: "Pelihaaste",
      body: roomDetails.name,
      type: "request",
      roomId: roomDetails.id,
      from: this.props.user.name,
    });
  }

  render() {
    const { user } = this.props;
    const { players } = this.props.common;
    const roomDetails = this.props.route.params.roomDetails;
    const userRoom = this.props.common.rooms.find(
      (room) => room.id === user.room.id
    );
    const listPlayers = players
      // .filter(p => p.notificationToken)
      .map((p) => ({ ...p, onPress: () => this.askPlayer(p, roomDetails) }));

    return userRoom ? (
      <Container>
        {this.state.showModal && (
          <Modal onClose={() => this.setState({ showModal: false })}>
            <PlayerList players={listPlayers} />
          </Modal>
        )}

        <Button
          onPress={() => this.playOffline()}
          title="Täytä huone boteilla"
        />
        <Button onPress={() => this.loadPlayers()} title="Kutsu pelaajia" />
        <Text style={styles.heading}>{roomDetails.name}</Text>
        <Text style={styles.text}>Panos: {roomDetails.bet}</Text>
        <Text style={styles.text}>Pisteraja: {roomDetails.pointLimit}</Text>
        <Text style={styles.text}>
          Pelaajia: {userRoom.players.length}/{roomDetails.playersAmount}
        </Text>
      </Container>
    ) : (
      <ActivityIndicator />
    );
  }
}

export default Connect(Queue);

const styles = {
  heading: {
    color: "white",
    fontSize: 30,
  },
  text: {
    color: "white",
  },
};
