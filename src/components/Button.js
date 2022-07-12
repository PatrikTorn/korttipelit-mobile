import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const Button = ({ onPress, title, active }) => {
  return (
    <TouchableOpacity
      style={styles.button(active)}
      onPress={() => onPress && onPress()}
    >
      <Text style={styles.title}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: (active) => ({
    backgroundColor: active ? "#ff2222" : "#107dac",
    padding: 10,
    borderRadius: 2,
  }),
  title: {
    color: "white",
  },
};
