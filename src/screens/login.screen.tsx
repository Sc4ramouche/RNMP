import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

import { Button } from '../components/button';

type State = {
  email: string,
  password: string
}

type Props = {};
export default class Login extends Component<Props, State> {
  state: State = {
    email: '',
    password: ''
  };

  handleLoginChange = (email: string): void => {
    this.setState({ email });
  }

  handlePasswordChange = (password: string): void => {
    this.setState({ password });
  }

  handleLoginTap = (): void => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <Text style={styles.heading}>Product Store</Text>
        <TextInput
          onChangeText={this.handleLoginChange}
          placeholder="email"
          style={[styles.input]} />
        <TextInput
          onChangeText={this.handlePasswordChange}
          placeholder="password"
          style={[styles.input, {marginBottom: 32}]} />
        <Button 
        title="LOGIN"
        onPress={this.handleLoginTap} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontFamily: 'oswald-regular',
    fontSize: 24,
    marginBottom: 80
  },
  input: {
    fontFamily: 'oswald-regular',
    textAlign: 'center',
    width: '80%',
    paddingVertical: 5,
    marginBottom: 24,
    borderWidth: 1
  },
  logo: {
    aspectRatio: 1.2,
    resizeMode: 'contain',
    marginBottom: 16,
  }
});