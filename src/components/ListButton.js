import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { colors } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
export const ListButton = ({
  title,
  subtitle,
  onPress,
  color,
  disabled,
  playersAmount,
  bet,
  pointLimit,
}) => {
  return (
    <TouchableOpacity
      style={styles.list(color, disabled)}
      disabled={disabled === true ? true : false}
      onPress={() => onPress && onPress()}
    >
      <View style={styles.topRight}>
        <Text style={{ color: "white" }}>
          <FontAwesome name="users" size={12} color="white" /> {playersAmount}
        </Text>
      </View>
      <View style={styles.topLeft}>
        {pointLimit && (
          <Text style={{ color: "white" }}>
            <FontAwesome name="list-ol" size={12} color="white" /> {pointLimit}
          </Text>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      {bet && (
        <Text style={styles.subtitle}>
          <FontAwesome name="bitcoin" size={12} color="white" /> {bet}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = {
  list: (color, disabled) => ({
    width: 160,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: color || colors.blue,
    borderWidth: 5,
    borderColor: colors.opacity.blue,
    borderRadius: 5,
    opacity: disabled ? 0.7 : 1,
  }),
  title: {
    color: "white",
    fontSize: 25,
  },
  subtitle: {
    color: "white",
    fontSize: 15,
  },
  topRight: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  topLeft: {
    position: "absolute",
    top: 5,
    left: 10,
  },
};
