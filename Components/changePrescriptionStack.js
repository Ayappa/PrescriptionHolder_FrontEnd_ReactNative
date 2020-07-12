import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Login';
import SideDrawer from './sideDrawer';
import SignUp from './SignUp';
import ForgotPassword from './ForgetPassword';
import PrescriptionBoard from './PrescriptionBoard';
import editPrescription from './editPrescription';
import Prescription from './Prescription';
import sideDrawerView from './sideDrawerView';
import createNewPrescription from './createNewPrescription';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function change() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PrescriptionBoardChange"
        component={PrescriptionBoard}
        options={p => ({
          title: 'PrescriptionBoard',
          headerStyle: {
            backgroundColor: '#2C3E50',
          },
          headerTitleStyle: {
            color: 'white',
          },
        })}
      />
      <Stack.Screen
        name="Prescription"
        component={Prescription}
        options={p => ({
          title: 'Prescription',
          headerStyle: {
            backgroundColor: '#2C3E50',
          },
          headerTitleStyle: {
            color: 'white',
          },
        })}
      />
      <Stack.Screen
        name="editPrescription"
        component={editPrescription}
        options={p => ({
          title: 'Edit Prescription',
          headerStyle: {
            backgroundColor: '#2C3E50',
          },
          headerTitleStyle: {
            color: 'white',
          },
        })}
      />
      <Stack.Screen
        name="CreateNewPrescription"
        component={createNewPrescription}
        options={p => ({
          title: 'Create New Prescription',
          headerStyle: {
            backgroundColor: '#2C3E50',
          },
          headerTitleStyle: {
            color: 'white',
          },
        })}
      />
    </Stack.Navigator>
  );
}
