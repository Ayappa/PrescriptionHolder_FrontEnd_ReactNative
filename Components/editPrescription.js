/* eslint-disable react-native/no-inline-styles */
// In index.js of a new project
import React, {useState, useEffect, Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Request from '../model/request';
import * as Progress from 'react-native-progress';
import {setPrescription} from '../Redux/actions/prescriptionAction';
import {connect} from 'react-redux';

const {
  View,
  Text,
  Alert,
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

const editPrescription = props => {
  const prescription = props.route.params.prescription;

  useEffect(() => {
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
  });
  const tablePlaceHolder = 'Enter the tablet name !!';
  const namePlaceHolder = 'Prescription for !!';
  const countPlaceHolder = '#per day';
  const [name, setName] = useState(prescription.patient_name);
  const [count, setCount] = useState('');
  const [tabletName, setTabletName] = useState('');
  const [tabletsList, setTabletsList] = useState(prescription.tablets);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (name.length == 0 || count.length == 0 || tabletName.length == 0) {
      alert('Please enter all input !!');
    } else {
      const tablet = {tablet_name: tabletName, tablet_count: count};
      var list = tabletsList;
      var boolean = false;
      list.forEach(x => {
        if (x.tablet_name == tablet.tablet_name) {
          alert('already exists');
          boolean = true;
          return;
        }
      });
      if (!boolean) list.push(tablet);
      setTabletsList(list);
      setTabletName('');
      setCount('');
    }
  };

  const deleteItem = tName => {
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
            console.log(tName);
            var list = tabletsList;
            list = list.filter(x => x.tablet_name != tName);
            setTabletsList(list);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const submitCreate = () => {
    setLoading(true);
    Request.upDatePrescription(
      prescription.patient_name,
      tabletsList,
      props.prescriptions.authToken,
    )
      .then(res => {
        props.navigation.pop();
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.box1} />
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setName(text);
          }}
          placeholder={namePlaceHolder}
          value={name}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TextInput
            style={styles.inputTablet}
            onChangeText={text => {
              setTabletName(text);
            }}
            placeholder={tablePlaceHolder}
            value={tabletName}
          />
          <TextInput
            keyboardType="numeric"
            style={styles.inputTabletCount}
            onChangeText={text => {
              setCount(text);
            }}
            placeholder={countPlaceHolder}
            value={count}
          />
        </View>
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            submit();
          }}
          style={styles.button}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
        <View style={{flex: 1, marginTop: '2%', width: '80%'}}>
          {loading && (
            <>
              <Progress.Bar
                progress={0.5}
                width={300}
                height={10}
                borderWidth={5}
                animationConfig={{bounciness: 10}}
                animationType="timing"
              />
              <Text style={styles.text}>Loading please wait ...</Text>
            </>
          )}

          {tabletsList.length != 0 && !loading && (
            <Text style={styles.text}>Your Tablets</Text>
          )}
          {tabletsList.length == 0 && (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                color: '#F2F3F4',
              }}>
              Create your Prescription!!!
            </Text>
          )}
          <FlatList
            data={tabletsList}
            horizontal={false}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textList}>{item.tablet_name}</Text>
                <Text
                  style={{fontSize: 20, paddingTop: '2%', paddingLeft: '5%'}}>
                  1 X{item.tablet_count} = {1 * item.tablet_count} tablets{' '}
                </Text>
                <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                  <Icon
                    disabled={loading}
                    name="trash-outline"
                    color="#CD6155"
                    size={30}
                    iconStyle={{alignSelf: 'left'}}
                    onPress={() => {
                      deleteItem(item.tablet_name);
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            submitCreate();
          }}
          style={styles.buttonSubmit}>
          <Text style={styles.text}>Submit</Text>
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
  textSubmit: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F2F3F4',
  },
  textList: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5F6A6A',
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
  inputTablet: {
    margin: '3%',
    marginLeft: '5%',
    marginRight: '2%',
    width: '70%',
    height: Dimensions.get('window').width * 0.12,
    borderColor: '#D0D3D4',
    borderWidth: 3,
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
  },
  inputTabletCount: {
    margin: '3%',
    marginLeft: '2%',
    marginRight: '5%',
    width: '25%',
    height: Dimensions.get('window').width * 0.12,
    borderColor: '#D0D3D4',
    borderWidth: 3,
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
  },
  button: {
    padding: '1%',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#2E86C1',
  },
  buttonSubmit: {
    marginTop: '3%',
    padding: '2%',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#117A65',
  },
});
const mapStateToProps = state => ({
  prescriptions: state.prescriptions,
});
const mapDispatchToProps = dispatch => ({
  setPrescription: prescription => dispatch(setPrescription()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(editPrescription);
