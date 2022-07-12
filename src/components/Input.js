import React from "react";
import { TextInput } from "react-native";

export const Input = ({ placeholder, onChange }) => {
  return (
    <TextInput
      underlineColorAndroid={"transparent"}
      style={styles.input}
      placeholder={placeholder}
      onChangeText={(name) => onChange && onChange(name)}
    />
  );
};

const styles = {
  input: {
    width: "60%",
    padding: 10,
    fontSize: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 15,
    color: "white",
  },
};
