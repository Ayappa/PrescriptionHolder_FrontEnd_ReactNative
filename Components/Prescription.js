/* eslint-disable react-native/no-inline-styles */
// In index.js of a new project
import React, {useState, useEffect, Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Request from '../model/request';
import {
  setPrescription,
  getPrescriptions,
} from '../Redux/actions/prescriptionAction';
import {connect} from 'react-redux';

const {
  View,
  Alert,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
} = require('react-native');

const Prescription = props => {
  var prescription = props.route.params.prescription;
  useEffect(() => {
    console.log(props.prescriptions.authToken);
    getPrescriptions(props.prescriptions.authToken);
    // console.log(prescription);
    props.navigation.closeDrawer();
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

  const deletePrescription = () => {
    Alert.alert(
      'Alert ',
      'Are you sure you want to delete !!!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Request.deletePrescription(
              prescription.patient_name,
              props.prescriptions.authToken,
            )
              .then(res => {
                console.log(res);
                props.navigation.replace('PrescriptionBoardChange');
              })
              .catch(err => {
                console.log(err);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const editPrescription = () => {
    props.navigation.push('editPrescription', {
      prescription: prescription,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.box1} />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.name}>{prescription.patient_name}</Text>
        <TouchableOpacity
          style={{paddingTop: '4%', paddingRight: '4%', alignSelf: 'flex-end'}}>
          <Icon
            // disabled={loading}
            name="trash-outline"
            color="#CD6155"
            size={40}
            iconStyle={{alignSelf: 'left'}}
            onPress={() => {
              deletePrescription();
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingTop: '4%', paddingRight: '4%', alignSelf: 'flex-end'}}>
          <Icon
            name="create"
            color="#212F3D"
            size={40}
            onPress={() => {
              editPrescription();
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, marginTop: '2%', width: '90%'}}>
        <Text style={styles.text}>Your Tablets</Text>
        <FlatList
          data={prescription.tablets}
          horizontal={false}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textList}>{item.tablet_name} </Text>
              <Text style={{fontSize: 20, paddingTop: '2%', paddingLeft: '5%'}}>
                1 X{item.tablet_count} = {1 * item.tablet_count} tablets{' '}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
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
  name: {
    //width: '80%',
    flex: 1,
    alignItems: 'flex-start',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F39C12',
    paddingTop: '3%',
    paddingLeft: '2%',
  },
  text: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#17202A',
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
  textList: {
    alignSelf: 'flex-start',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D0D3D4',
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

  setPrescription: prescription => dispatch(setPrescription()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Prescription);
