import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Connect } from "../actions";
import { colors } from "../constants";

class Header extends React.Component {
  render() {
    const user = this.props.user;
    const { navigation } = this.props;
    const { routes } = navigation.getState();
    const routeName = routes[routes.length - 1].name;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.profile(routeName === "Profile")}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              style={styles.coin}
              source={
                user.fbId
                  ? {
                      uri: `http://graph.facebook.com/${user.fbId}/picture?type=square`,
                    }
                  : require("../images/user_icon.png")
              }
            />
            <Text style={styles.text}>{user.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.game(routeName === "Lobby")}
            onPress={() => navigation.navigate("Lobby")}
          >
            <Image
              style={{ width: 150, height: 45 }}
              source={require("../images/logo_text.png")}
            />
          </TouchableOpacity>

          <View style={styles.money}>
            <Image style={styles.coin} source={require("../images/coin.png")} />
            <Text style={styles.text}>{user.money}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Connect(Header);

const styles = {
  text: {
    color: "white",
    fontSize: 20,
  },
  heading: {
    color: "white",
    fontSize: 25,
  },
  headerContainer: {
    height: 60,
    backgroundColor: "transparent",
  },
  header: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    flexDirection: "row",
    width: "100%",
  },
  profile: (active) => ({
    flex: 0.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: active ? colors.blue : "transparent",
  }),
  game: (active) => ({
    flex: 0.5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.opacity.white,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: active ? colors.blue : "transparent",
  }),
  money: {
    flex: 0.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  coin: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
};
