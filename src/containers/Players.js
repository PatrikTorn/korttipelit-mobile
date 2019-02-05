import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {Container, Button, PlayerList} from '../components'
import {Connect} from '../actions';

class Players extends React.Component {
 
  render() {
    const players = this.props.common.players.sort((a,b) => b.money-a.money);
    return (
      <Container>
          <View style={styles.content}>
            <PlayerList players={players} />
          </View>
      </Container>
    )
  }
}
export default Connect(Players);

const styles = {
    content:{
        width:'60%',
        flex:1,
        flexDirection:'column',
        backgroundColor:'rgba(255,255,255,0.05)',
        padding:20,
    },
}