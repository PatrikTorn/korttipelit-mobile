import React from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Connect } from "../../actions";
import { Button, ListButton } from "../../components";
import { SOCKET_SERVER_ACTIONS } from "../../constants";
import { RoomType } from "../../types";
import Footer from "./Footer";

const images = {
  wallpaper: require("../../images/wallpaper.jpg"),
};

class Lobby extends React.Component {
  state = {
    gameType: null,
    playersAmount: 2,
  };

  componentDidMount() {
    this.props.registerNotifications();
    this.props.getPlayers();
  }

  joinRoom(roomName) {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.ROOM.JOIN_ROOM, roomName);
  }

  playOffline() {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.ROOM.PLAY_OFFLINE);
  }

  createGameId(room) {
    return `${this.state.gameType}-b${room.bet}-p${this.state.playersAmount}-l${room.pointLimit}`;
  }

  getPlayersAmount(gameType) {
    return this.props.common.rooms.reduce((acc, room) => {
      if (
        (room.type === RoomType.Queue && room.config.gameType === gameType) ||
        (room.type === RoomType.Game && room.gameType === gameType)
      ) {
        return acc + room.players.length;
      } else {
        return acc;
      }
    }, 0);
  }

  acceptChallenge() {
    const foundRoom = this.props.common.rooms.find(
      (r) => r.id === this.props.notification.roomId
    );
    if (foundRoom) {
      const data = {
        ...foundRoom.config,
        id: foundRoom.id,
      };
      this.joinRoom(data);
    } else {
      alert("Huoneessa ei ole ketään enää paikalla..");
    }
    this.props.hideNotification();
  }

  createRoom({ bet, pointLimit, name, color }) {
    let data = { bet, pointLimit, name, color };
    data.playersAmount = this.state.playersAmount;
    data.gameType = this.state.gameType;
    // const
    // TODO: Testing purposes for bug!
    data.id = `${data.gameType}-b${data.bet}-p${data.playersAmount}-l${data.pointLimit}`;
    this.joinRoom(data);
  }

  joinRoom(data) {
    this.props.socket.emit(SOCKET_SERVER_ACTIONS.ROOM.CREATE_ROOM, data);
    this.props.navigation.navigate("Queue", { roomDetails: data });
  }

  renderGameTypes() {
    const gameTypes = [
      {
        name: "Paskahousu",
        color: "brown",
        onPress: () => this.setState({ gameType: RoomType.Paskahousu }),
        playersAmount: this.getPlayersAmount(RoomType.Paskahousu),
      },
      {
        name: "Tikkipokeri",
        color: "green",
        onPress: () => {
          this.setState({ gameType: RoomType.Tikkipokeri });
        },
        playersAmount: this.getPlayersAmount(RoomType.Tikkipokeri),
      },
      {
        name: "Mustamaija",
        playersAmount: 0,
        disabled: true,
      },
      {
        name: "Pelaajat",
        color: "gray",
        onPress: () => {
          this.props
            .getPlayers()
            .then(() => this.props.navigation.navigate("Players"))
            .catch(() => alert("No connection to server"));
        },
      },
    ];
    return this.createRoomList(gameTypes);
  }

  renderGamePlaces() {
    const gamePlaces = [
      {
        bet: 100,
        pointLimit: 5,
        name: "Hervanta",
        color: "green",
      },
      {
        bet: 150,
        pointLimit: 10,
        name: "Otanniemi",
        color: "orange",
      },
      {
        bet: 250,
        pointLimit: 15,
        name: "Eira",
        color: "purple",
      },
      {
        bet: 500,
        pointLimit: 10,
        name: "Pariisi",
        color: "red",
      },
      {
        bet: 1000,
        pointLimit: 5,
        name: "Tokio",
        color: "darkblue",
      },
    ].map((place) => ({ ...place, onPress: () => this.createRoom(place) }));
    return this.createRoomList([
      {
        name: "Peliaula",
        playersAmount: this.props.common.rooms.find((r) => r.id === "lobby")
          ?.players.length,
        onPress: () => this.setState({ gameType: null }),
      },
      ...gamePlaces,
    ]);
  }

  createRoomList(items) {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rooms}
        style={{ flex: 0.85 }}
      >
        {items.map((room) => {
          const thisRoom = this.props.common.rooms
            .filter((r) => r.type === RoomType.Queue)
            .find((r) => r.id === this.createGameId(room));
          return (
            <ListButton
              key={Math.random()}
              onPress={() => room.onPress()}
              title={room.name}
              subtitle={
                this.state.gameType &&
                room.name !== "Peliaula" &&
                `${room.bet} | ${room.pointLimit}`
              }
              bet={room.bet}
              pointLimit={
                this.state.gameType === RoomType.Tikkipokeri && room.pointLimit
              }
              color={room.color}
              playersAmount={
                thisRoom
                  ? `${thisRoom.players.length}/${this.state.playersAmount}`
                  : room.playersAmount || 0
              }
              disabled={room.disabled}
            />
          );
        })}
      </ScrollView>
    );
  }

  render() {
    const { rooms } = this.props.common;
    const user = this.props.user;

    return (
      <ImageBackground
        source={images.wallpaper}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            {this.props.notification.show && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  backgroundColor: "red",
                  width: "100%",
                  height: 30,
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  zIndex: 200,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.hideNotification({})}
                >
                  <Text style={styles.text}>Hylkää</Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                  {this.props.notification.data.message}
                </Text>
                <TouchableOpacity onPress={() => this.acceptChallenge()}>
                  <Text style={styles.text}>Hyväksy</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.topLayout}>
              {this.state.gameType &&
                [2, 3, 4].map((p) => (
                  <Button
                    onPress={() => this.setState({ playersAmount: p })}
                    active={this.state.playersAmount === p}
                    title={p + " pelaajaa"}
                    key={`key-` + p}
                  />
                ))}
            </View>

            {!this.state.gameType
              ? this.renderGameTypes()
              : this.renderGamePlaces()}
          </View>
          <Footer />
        </View>
      </ImageBackground>
    );
  }
}

export default Connect(Lobby);

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: 'rgba(0,0,0,0.6)',
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  heading: {
    color: "white",
    fontSize: 25,
  },
  content: {
    flex: 0.8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rooms: {
    justifyContent: "center",
    alignItems: "center",
  },
  topLayout: {
    position: "absolute",
    top: 10,
    flexDirection: "row",
    zIndex: 5,
  },
};
