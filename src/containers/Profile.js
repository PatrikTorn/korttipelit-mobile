import React from "react";
import { View, Text, Image } from "react-native";
import { Container, Button } from "../components";
import { Connect } from "../actions";
import { colors } from "../constants";

class Profile extends React.Component {
  state = {
    game: "Tikkipokeri",
  };
  games() {
    return (
      <View style={styles.games}>
        {["Paskahousu", "Tikkipokeri"].map((game) => (
          <View style={{ flex: 1 }} key={game}>
            <Button onPress={() => this.setState({ game })} title={game} />
          </View>
        ))}
      </View>
    );
  }

  details() {
    const { user } = this.props;
    return (
      <View style={styles.details}>
        <Image
          source={require("../images/user_icon.png")}
          style={styles.image}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.level}>Taso: </Text>
      </View>
    );
  }
  render() {
    const { user } = this.props;
    return (
      <Container>
        <View style={styles.card}>
          {this.details()}
          {this.games()}
          <Text style={styles.text}>Pelejä pelattu: {user.games.length}</Text>
          <Text style={styles.text}>
            Voitto-%:{" "}
            {Math.round(
              ((user.games.filter((g) => g.gameWon).length /
                user.games.length) *
                100) /
                100
            ) * 100}
            %
          </Text>
          <Text style={styles.text}>Korkein käsi: {user.highestHand.name}</Text>
        </View>
      </Container>
    );
  }
}
export default Connect(Profile);

const styles = {
  card: {
    width: "60%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
  },
  details: {
    flex: 0.5,
    flexDirection: "column",
    paddingLeft: 120,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
    padding: 5,
  },
  name: {
    color: "white",
    fontSize: 25,
  },
  level: {
    color: "white",
    fontSize: 20,
  },
  games: {
    flex: 0.35,
    flexDirection: "row",
    alignItems: "space-between",
    width: "100%",
    justifyContent: "center",
  },
  image: {
    width: 90,
    height: 90,
    position: "absolute",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.opacity.blue,
  },
};
