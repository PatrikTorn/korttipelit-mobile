import React from "react";
import { Input, Container, Button } from "../../components";
import { Connect } from "../../actions";
import { SOCKET_SERVER_ACTIONS } from "../../constants";
class Register extends React.Component {
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
            this.props.socket.emit(SOCKET_SERVER_ACTIONS.AUTH.REGISTER, {
              name: this.state.name,
              password: this.state.password,
            })
          }
          title="Rekisteröidy"
        />
      </Container>
    );
  }
}

export default Connect(Register);
