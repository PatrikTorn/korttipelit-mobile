import React from "react";
import { ImageBackground } from "react-native";

export const Table = (props) => {
  return (
    <ImageBackground
      style={styles.table}
      source={require("../images/table.png")}
    >
      {props.children}
    </ImageBackground>
  );
};

const styles = {
  table: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#282c34",
    justifyContent: "center",
    alignItems: "center",
  },
};
