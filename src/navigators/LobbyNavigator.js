import { createStackNavigator } from "@react-navigation/stack";
import Lobby from "../containers/Lobby/Lobby";
import Profile from "../containers/Profile";
import Players from "../containers/Players";
import Queue from "../containers/Lobby/Queue";
import React from "react";
import Header from "../containers/Header";
import { createAppContainer } from "react-navigation";
import { Text, View } from "react-native";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 60, // Specify the height of your custom header
        },
        //
        header: ({ navigation }) => <Header navigation={navigation} />,
      }}
    >
      <Stack.Screen name="Lobby" component={Lobby} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Queue" component={Queue} />
      <Stack.Screen name="Players" component={Players} />
    </Stack.Navigator>
  );
};
