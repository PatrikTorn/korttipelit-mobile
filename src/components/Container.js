import React from "react";
import { View } from "react-native";
export const Container = (props) => {
  return (
    <View style={props.centered ? styles.container : styles.container}>
      {props.children}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    justifyContent: "center",
  },
  containerNormal: {
    flex: 1,
    backgroundColor: "#282c34",
    width: "100%",
    height: "100%",
  },
};
