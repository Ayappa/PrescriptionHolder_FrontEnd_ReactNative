/* eslint-disable react-native/no-inline-styles */
// In index.js of a new project
import React, {useState, useEffect} from 'react';
import Request from '../model/request';
import {connect} from 'react-redux';
import {setToken} from '../Redux/actions/prescriptionAction';
const {
  View,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
} = require('react-native');

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailPlaceHolder = 'Enter your email Id !!';
  const passwordPlaceHolder = 'Enter your password !!';

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const value = await AsyncStorage.getItem('authToken');
    if (value !== null) {
      // We have data!!
      await props.setAuthToken(value);
      console.log(value);
      props.navigation.replace('PrescriptionBoard');
    }
  };
  const login = async () => {
    var myRe = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    if (!myRe.test(email)) {
      alert('email must contails @ and .com');
    } else if (email.length == 0 || password.length == 0) {
      alert('Make sure you entered all the details !!');
    } else {
      Request.login(email, password)
        .then(res => {
          console.log('res');
          if (res.data.token === 'Incorrect creditional') {
            alert('Make sure entered details are correct');
          } else {
            storeData(res.data.token);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const storeData = async token => {
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

        <Text style={styles.login}>Sign In</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setEmail(text);
          }}
          value={email}
          placeholder={emailPlaceHolder}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={text => {
            setPassword(text);
          }}
          value={password}
          placeholder={passwordPlaceHolder}
        />
        <TouchableOpacity
          onPress={() => {
            login();
          }}
          style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SignUp');
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingTop: 10,
              fontWeight: 'bold',
              color: 'white',
            }}>
            SignUp
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ForgotPassword');
          }}>
          <Text style={{fontSize: 20, paddingTop: 10, fontWeight: 'bold'}}>
            Forgot Password ?
          </Text>
        </TouchableOpacity> */}
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
    marginTop: '5%',
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
)(Login);
