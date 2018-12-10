import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

import { Button } from '../components/button';

type State = {
  email: string,
  password: string
}

type Props = {
  onLogin: () => void
};
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
        onPress={this.props.onLogin} />
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
    fontFamily: 'Oswald-Regular',
    fontSize: 24,
    marginBottom: 80
  },
  input: {
    fontFamily: 'Oswald-Regular',
    textAlign: 'center',
    width: '80%',
    color: '#696969',
    paddingVertical: 5,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#696969'
  },
  logo: {
    aspectRatio: 1.2,
    resizeMode: 'contain',
    marginBottom: 16,
  }
});
