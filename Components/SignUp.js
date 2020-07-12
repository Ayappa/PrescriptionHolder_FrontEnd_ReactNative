/* eslint-disable react-native/no-inline-styles */
// In index.js of a new project
import React, {useState} from 'react';
import {StackActions, NavigationActions} from 'react-navigation';
import Request from '../model/request';
import {connect} from 'react-redux';
import {setToken} from '../Redux/actions/prescriptionAction';
const {
  View,
  Text,
  Keyboard,
  TextInput,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
} = require('react-native');

const SignUp = props => {
  const changeRoot = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'PrescriptionBoard'})],
  });
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = () => {
    var myRe = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    if (
      email.length == 0 ||
      firstName.length == 0 ||
      password.length == 0 ||
      lastName.length == 0 ||
      confirmPassword.length == 0
    ) {
      alert('Please enter all fileds !!!');
    } else if (confirmPassword != password) {
      alert('passwords dont match !!!');
    } else if (!myRe.test(email)) {
      alert('email must contails @ and .com');
    } else {
      Request.register(firstName, lastName, email, password)
        .then(res => {
          if (res.data.token === 'alreadyExists') {
            alert('Email already taken');
          } else {
            setToken(res.data.token);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const setToken = async token => {
    try {
      await AsyncStorage.setItem('authToken', token);
      const value = await AsyncStorage.getItem('authToken');
      if (value !== null) {
        // We have data!!
        await props.setAuthToken(value);
        console.log(value);
        props.navigation.replace('PrescriptionBoard');
      }
      //
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.box1} />

        <Text style={styles.login}>Sign Up</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={text => {
            setFirstName(text);
          }}
          placeholder={'Enter your first name !!'}
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={text => {
            setLastName(text);
          }}
          placeholder={'Enter your last name !!'}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
          placeholder={'Enter your email Id !!'}
        />
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
          }}
          placeholder={'Enter your password!!'}
        />
        <TextInput
          style={styles.input}
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={text => {
            setConfirmPassword(text);
          }}
          placeholder={'confirm password !!'}
        />
        <TouchableOpacity
          onPress={() => {
            signUp();
            // props.navigation.reset({
            //   index: 0,
            //   routes: [
            //     {
            //       name: 'PrescriptionBoard',
            //       params: {someParam: 'Param1'},
            //     },
            //   ],
            // });
            //  props.navigation.navigate('PrescriptionBoard');
          }}
          style={styles.button}>
          <Text style={styles.text}>SignUp</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    paddingTop: '5%',
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
    width: '30%',
    height: Dimensions.get('window').width * 0.12,
    borderColor: '#2E86C1',
    borderWidth: 2,
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    backgroundColor: '#057AEE',
  },
});
const mapDispatchToProps = dispatch => ({
  setAuthToken: token => dispatch(setToken(token)),
});
export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
