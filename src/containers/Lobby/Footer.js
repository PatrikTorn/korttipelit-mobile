import React from "react";
import { AsyncStorage, Text, TouchableOpacity, View } from "react-native";
import { Connect } from "../../actions";
import { colors } from "../../constants";

class Footer extends React.Component {
  async logout() {
    try {
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("fbId");
      // this.props.socket.emit('logout');
      this.props.logout();
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { user } = this.props;
    return (
      <View style={styles.footer}>
        <View style={styles.levelCircle}>
          <Text style={styles.text}>{user.stats.level}</Text>
        </View>
        <View
          style={{
            ...styles.levelLine,
            width: `${(user.stats.levelDeg - user.stats.level) * 100}%`,
            backgroundColor: "green",
            zIndex: 2,
          }}
        ></View>
        <View style={styles.levelLine}></View>
        <TouchableOpacity style={styles.settings} onPress={() => this.logout()}>
          <Text style={{ fontSize: 30, color: "white" }}>&#9881;</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Connect(Footer);

const styles = {
  text: {
    color: "white",
    fontSize: 20,
  },
  settings: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "gray",
    width: 45,
    height: 45,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  levelLine: {
    position: "absolute",
    bottom: 15,
    left: 15,
    backgroundColor: colors.light,
    borderWidth: 2,
    borderColor: colors.opacity.white,
    width: "50%",
    height: 20,
    borderRadius: 3,
  },
  levelCircle: {
    position: "absolute",
    bottom: 5,
    left: 5,
    width: 45,
    height: 45,
    backgroundColor: colors.blue,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.opacity.blue,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 0.2,
    width: "100%",
    height: 20,
    backgroundColor: colors.opacity.black,
    zIndex: 4,
  },
};
