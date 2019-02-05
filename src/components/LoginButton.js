import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
export const LoginButton = ({color, border, title, onPress, icon}) => {
  return(
    <TouchableOpacity style={styles.container({color, border})} onPress={() => onPress && onPress()}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.title}><Text style={styles.text}>{title}</Text></View>
    </TouchableOpacity>
  )
}

const styles = {
  container: ({color, border}) => ({
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:color,
    padding:40,
    borderWidth:4,
    borderColor:border,
    borderRadius:5,
    width:'100%',
    margin:5
  }),
  icon:{
    flex:0.2
  },
  title:{
    flex:0.8
  },
  text:{
    color:'white',
    fontSize:25
  }
}