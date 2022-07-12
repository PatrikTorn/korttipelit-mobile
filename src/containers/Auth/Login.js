import React from "react";
import { View, Text } from "react-native";
import { Input, Container, Button } from "../../components";
import { Connect } from "../../actions";
import axios from "axios";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

class Login extends React.Component {
  state = {
    name: null,
    password: null,
  };

  render() {
    return (
      <Container>
        <Input
          placeholder="Syötä nimesi"
          onChange={(name) => this.setState({ name })}
        />
        <Input
          placeholder="Salasana"
          onChange={(password) => this.setState({ password })}
        />
        <Button
          className="userButton"
          onPress={() =>
            this.props.login({
              name: this.state.name,
              password: this.state.password,
            })
          }
          title="Sisään"
        />
      </Container>
    );
  }
}

export default Connect(Login);
