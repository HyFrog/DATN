import React from 'react';
import { Text, View } from 'react-native';

//make a Component
const Header = (props) => {
  const { headerStyle, bgHeader } = styles;

  return (
    <View style = {bgHeader}>
      <Text style = { headerStyle }>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  bgHeader: {
    backgroundColor: '#0288D1',
    justifyContent:'center',
    alignItems:'center',
  },
  headerStyle: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
};

module.exports = Header;
