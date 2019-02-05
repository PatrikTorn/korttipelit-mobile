import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from './src/store';
import ScreenContainer from './src/containers/ScreenContainer';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native'

import {Permissions, Notifications} from 'expo'

console.disableYellowBox = true;

function changeScreenOrientation() {
  Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
}



export default class App extends React.Component {

  componentDidMount(){
    changeScreenOrientation()
  }




  // componentWillUnmount() {
  //   Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  // }



  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <StatusBar hidden={true} />
          <ScreenContainer/>
        </React.Fragment>

      </Provider>
    );
  }
}
