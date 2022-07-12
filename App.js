import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import ScreenContainer from "./src/containers/ScreenContainer";
import store from "./src/store";

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
