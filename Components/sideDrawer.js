/* eslint-disable react-native/no-inline-styles */
// In index.js of a new project
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const {
  View,
  Text,
  Alert,
  Keyboard,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
  AsyncStorage,
  FlatList,
} = require('react-native');

const sideDrawer = props => {
  const Logout = () => {
    Alert.alert(
      'Alert ',
      'Are you sure you want to Log out !!!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await AsyncStorage.removeItem('authToken');
            props.navigation.replace('Login');
            console.log(props.prescriptions.prescriptions);
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.box1} />
      <View style={styles.header}>
        <Text style={styles.text}>Your Prescriptions</Text>

        <TouchableOpacity
          onPress={() => {
            props.navigation.replace('CreateNewPrescription');
          }}
          style={{
            flex: 1,
            alignItems: 'flex-end',
            paddingLeft: '10%',
          }}>
          <Icon
            name="plus-circle"
            color="white"
            size={40}
            iconStyle={{alignSelf: 'left'}}
          />
        </TouchableOpacity>
      </View>
      {props.prescriptions.prescriptions.length == 0 && (
        <Text
          style={{
            fontSize: 20,
            paddingTop: '20%',
            padding: '2%',
            fontWeight: 'bold',
          }}>
          You seem to have to no prescription !!! , add them with above icon ...
        </Text>
      )}
      <FlatList
        data={props.prescriptions.prescriptions}
        numColumns={2}
        horizontal={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.names}
            onPress={() => {
              props.navigation.replace('Prescription', {
                prescription: item,
              });
            }}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 25,
                color: '#F2F3F4',
              }}>
              {item.patient_name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        onPress={() => {
          Logout();
        }}
        style={styles.footer}>
        <Text style={styles.text1}>LogOut</Text>
        <Icon
          name="sign-out"
          color="white"
          size={40}
          iconStyle={{alignSelf: 'left'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#F1C40F',
  },
  box1: {
    position: 'absolute',
    bottom: '-50%',
    left: '-50%',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').width * 1.5,
    backgroundColor: '#27AE60',
  },
  names: {
    alignContent: 'center',
    margin: '2%',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: Dimensions.get('window').width * 0.32,
    height: Dimensions.get('window').width * 0.32,
    backgroundColor: '#D35400',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '2%',
    borderRadius: 4,
    backgroundColor: '#BD2E3D',
  },
  footer: {
    padding: '1%',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 3,
    backgroundColor: '#2E86C1',
  },
  login: {
    alignItems: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F2F3F4',
    paddingTop: '30%',
  },
  text: {
    alignSelf: 'flex-start',
    alignContent: 'center',
    fontSize: 25,
    color: '#F2F3F4',
    paddingBottom: 5,
  },
  text1: {
    marginRight: '5%',
    fontSize: 25,
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
const mapStateToProps = state => ({
  prescriptions: state.prescriptions,
});
export default connect(mapStateToProps)(sideDrawer);
