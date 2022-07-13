import { createStackNavigator } from "@react-navigation/stack";
import LoginMenu from "../containers/Auth/LoginMenu";
import Login from "../containers/Auth/Login";
import Register from "../containers/Auth/Register";
// import { createAppContainer } from "react-navigation";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginMenu" component={LoginMenu} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
