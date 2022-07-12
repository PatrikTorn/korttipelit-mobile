import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { colors } from "../constants";

export const PlayerList = ({ players }) => {
  return (
    <ScrollView>
      {players.map((player, i) => (
        <TouchableOpacity
          style={styles.player(i)}
          key={i}
          onPress={() => player.onPress && player.onPress()}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.level}>{i + 1}.</Text>
          </View>

          <View>
            <Text style={styles.text}>Nimi: {player.name}</Text>
            <Text style={styles.text}>Level: {player.level}</Text>
          </View>
          <View>
            <Text style={styles.text}>Rahaa: {player.money}</Text>
            <Text style={styles.text}>
              Pelattuja pelejä: {player.games.length}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = {
  player: (i) => ({
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.3)" : "transparent",
  }),

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
