/* eslint-disable react-native/no-inline-styles */
// In index.js of a new project
import React, {useState, useEffect, Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {getPrescriptions} from '../Redux/actions/prescriptionAction';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

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

const PrescriptionBoard = props => {
  useEffect(() => {
    props.OnGetPrescriptions(props.prescriptions.authToken);
    console.log(props.prescriptions.authToken);
    props.navigation.setOptions({
      headerLeft: () => (
        <Icon
          name="options-outline"
          size={40}
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
      ),
    });
  }, []);

  const [email, setEmail] = useState('Enter your email Id !!');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.box1} />

        <Text style={styles.login}>Welcome to Prescription Holder !!</Text>

        <Text
          style={{
            fontSize: 20,
            paddingTop: '10%',
            padding: '2%',
            fontWeight: 'bold',
          }}>
          This allows you to Store all your family , friends and yours at a one
          place , so which helps you to purchase medicine , or look up or show
          doctors . All that you need to do is , store them manually in add
          prescription tab.
        </Text>

        <Text
          style={{
            fontSize: 20,
            paddingTop: '20%',
            padding: '2%',
            fontWeight: 'bold',
          }}>
          @copyRight AyappaKrishnappa
        </Text>
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
    //alignItems: 'center',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F2F3F4',
    paddingTop: '15%',
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

// Promise.all([Icon.getImageSource('md-options', 30)]).then(res => {
//   PrescriptionBoard.options = {
//     topBar: {
//       title: {
//         text: 'PrescriptionBoard',
//         color: 'white',
//       },
//       backButton: {
//         visible: false,
//       },
//       background: {
//         color: '#34495E',
//       },
//       leftButtons: {
//         id: 'option',
//         icon: res[0],
//       },
//     },
//   };
// });

const mapStateToProps = state => ({
  prescriptions: state.prescriptions,
});

const mapDispatchToProps = dispatch => ({
  OnGetPrescriptions: token => dispatch(getPrescriptions(token)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrescriptionBoard);
