import {createStackNavigator} from 'react-navigation'
import Lobby from '../containers/Lobby/Lobby';
import Profile from '../containers/Profile';
import Players from '../containers/Players';
import Queue from '../containers/Lobby/Queue';
import React from 'react'
import Header from '../containers/Header';
export default createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    Lobby,
    Profile,
    Queue,
    Players
    },{
        navigationOptions: ({navigation}) => ({
            header: <Header navigation={navigation}/>
        })
    }
);