import React from 'react';
import { Connect } from '../actions';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {colors} from '../constants';

class Header extends React.Component {
  render(){
    const user = this.props.user;
    console.log(this.props)
    const {navigation} = this.props;
    const {routeName} = navigation.state;
    // user.fbId = "2034164583273480";
    return(
        <View style={styles.header}>

          <TouchableOpacity style={styles.profile(routeName === 'Profile')} onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.coin}
              source={user.fbId ? {uri:`http://graph.facebook.com/${user.fbId}/picture?type=square`}: require('../images/user_icon.png')} 
            />
            <Text style={styles.text}>{user.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.game(routeName === 'Lobby')} onPress={() => navigation.navigate('Lobby')}>

            <Image
              style={{width:150, height:45}}
              source={require('../images/logo_text.png')}
            />
          </TouchableOpacity>

          <View style={styles.money}>
            <Image
              style={styles.coin}
              source={require('../images/coin.png')}
            />
            <Text style={styles.text}>{user.money}</Text>
          </View>

        </View>
    );
  }
}

export default Connect(Header);

const styles = {
  text:{
    color:'white',
    fontSize:20
  },
  heading:{
    color:'white',
    fontSize:25
  },
  header:{
    flex:0.15,
    backgroundColor:'rgba(0,0,0,0.9)',
    flexDirection:'row'
  },
  profile: (active) => ({
    flex:0.25,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: active ? colors.blue : 'transparent'
  }),
  game: (active) => ({
    flex:0.5,
    borderRightWidth:1,
    borderLeftWidth:1,
    borderColor:colors.opacity.white,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: active ? colors.blue : 'transparent'
  }),
  money:{
    flex:0.25,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  coin:{
    width: 20, 
    height: 20, 
    marginRight:5
  }
}


