import React from "react";
import { Modal as RNModal, View } from "react-native";

export const Modal = (props) => {
  return (
    <RNModal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => props.onClose()}
    >
      <View style={styles.content}>{props.children}</View>
    </RNModal>
  );
};

const styles = {
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: "5%",
  },
};
