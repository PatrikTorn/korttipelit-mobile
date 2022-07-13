import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Input, Container, LoginButton } from "../../components";
import { Connect } from "../../actions";
import axios from "axios";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { SOCKET_SERVER_ACTIONS } from "../../constants";

class LoginMenu extends React.Component {
  state = {
    name: null,
    loading: true,
  };
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ loading: false });
      AsyncStorage.removeItem("name");
    }, 5000);
    this.watchUser();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  async watchUser() {
    const name = await AsyncStorage.getItem("name");
    const fbId = await AsyncStorage.getItem("fbId");
    if (fbId)
      this.props.socket.emit(SOCKET_SERVER_ACTIONS.AUTH.LOGIN, { fbId });
    else if (name)
      this.props.socket.emit(SOCKET_SERVER_ACTIONS.AUTH.SET_NAME, name);
    else this.setState({ loading: false });
  }

  async fbLogin() {
    try {
      const { type, token, expires, permissions, declinedPermissions } =
        await Expo.Facebook.logInWithReadPermissionsAsync("952125358331282", {
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await axios.get(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        console.log(response.data);
        console.log({ name: response.data.name, fbId: response.data.id });
        // this.props.login({name:response.data.name, fbId:response.data.id});
        this.props.login({ name: response.data.name, fbId: response.data.id });
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ width: "60%" }}>
            <LoginButton
              onPress={() => this.props.navigation.navigate("Login")}
              title="Kirjaudu tunnuksilla"
              color="#ed1e29"
              border="#f4424b"
              icon={
                <MaterialCommunityIcons name="login" size={60} color="white" />
              }
            />
            <LoginButton
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
              title="Rekisteröidy"
              color="gray"
              border="#b0b4b7"
              icon={
                <MaterialCommunityIcons
                  name="account-key"
                  size={60}
                  color="white"
                />
              }
            />
          </View>
        )}
      </Container>
    );
  }
}

export default Connect(LoginMenu);
