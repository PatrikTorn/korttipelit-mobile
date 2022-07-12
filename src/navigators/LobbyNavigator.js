import { createStackNavigator } from "@react-navigation/stack";
import Lobby from "../containers/Lobby/Lobby";
import Profile from "../containers/Profile";
import Players from "../containers/Players";
import Queue from "../containers/Lobby/Queue";
import React from "react";
import Header from "../containers/Header";
import { createAppContainer } from "react-navigation";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lobby" component={Lobby} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Queue" component={Queue} />
      <Stack.Screen name="Players" component={Players} />
    </Stack.Navigator>
  );
};
// export default createAppContainer(
//   createStackNavigator(
//     {
//       // For each screen that you can navigate to, create a new entry like this:
//       Lobby,
//       Profile,
//       Queue,
//       Players,
//     },
//     {
//       headerMode: "screen",
//       headerStyle: {
//         height: 80, // Specify the height of your custom header
//       },
//       navigationOptions: ({ navigation }) => ({
//         header: <Header navigation={navigation} />,
//         headerMode: "screen",
//         headerStyle: {
//           height: 80, // Specify the height of your custom header
//         },
//       }),
//     }
//   )
// );
