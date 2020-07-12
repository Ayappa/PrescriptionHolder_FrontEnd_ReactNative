/* eslint-disable react-native/no-inline-styles */
// In index.js of a new project
import React, {useState,useEffect} from 'react';
const {
  View,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
} = require('react-native');

const ForgotPassword = props => {

  const [email, setEmail] = useState('Enter your email Id !!');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.box1} />

        <Text style={styles.login}>Reset Password</Text>
        <TextInput style={styles.input} value={email} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>send verification mail</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: '#BD2E3D',
  },
  box1: {
    position: 'absolute',
    bottom: '-50%',
    left: '-50%',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: Dimensions.get('window').width * 1.5,
    height: Dimensions.get('window').width * 1.75,
    backgroundColor: '#2C3E50',
  },
  login: {
    alignItems: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F2F3F4',
    paddingTop: '30%',
  },
  text: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F2F3F4',
  },
  input: {
    marginTop: '5%',
    width: '85%',
    height: Dimensions.get('window').width * 0.12,
    borderColor: '#D0D3D4',
    borderWidth: 3,
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
  },
  button: {
    alignContent: 'center',
    marginTop: '8%',
    height: Dimensions.get('window').width * 0.12,
    borderColor: '#2E86C1',
    borderWidth: 2,
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 5,
    backgroundColor: '#057AEE',
  },
});

export default ForgotPassword;
