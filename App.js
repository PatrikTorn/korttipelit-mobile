import React from "react";
import { StyleSheet, Text, View } from "react-native";
import store from "./src/store";
import ScreenContainer from "./src/containers/ScreenContainer";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Permissions, Notifications } from "expo";
import { LoginButton } from "./src/components";

console.disableYellowBox = true;

function changeScreenOrientation() {
  ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
}

export default class App extends React.Component {
  componentDidMount() {
    changeScreenOrientation();
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <StatusBar hidden={true} />
          <ScreenContainer />
        </React.Fragment>
      </Provider>
    );
  }
}
