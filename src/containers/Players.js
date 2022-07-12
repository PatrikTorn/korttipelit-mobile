import React from "react";
import { View } from "react-native";
import { Connect } from "../actions";
import { Container, PlayerList } from "../components";

class Players extends React.Component {
  render() {
    const players = this.props.common.players.sort((a, b) => b.money - a.money);
    return (
      <Container>
        <View style={styles.content}>
          <PlayerList players={players} />
        </View>
      </Container>
    );
  }
}

export default Connect(Players);

const styles = {
  content: {
    width: "60%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
  },
};
