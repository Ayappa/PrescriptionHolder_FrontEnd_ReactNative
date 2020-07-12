import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Components/Login';
import SideDrawer from './Components/sideDrawer';
import SignUp from './Components/SignUp';
import ForgotPassword from './Components/ForgetPassword';
import PrescriptionBoard from './Components/PrescriptionBoard';
import sideDrawerView from './Components/sideDrawerView';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import store from './Redux/store';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: '#2C3E50',
              },
              headerTitleStyle: {
                color: 'white',
              },
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: 'SignUp',
              headerStyle: {
                backgroundColor: '#2C3E50',
              },
              headerTitleStyle: {
                color: 'white',
              },
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: 'ForgotPassword',
              headerStyle: {
                backgroundColor: '#2C3E50',
              },
              headerTitleStyle: {
                color: 'white',
              },
            }}
          />
          <Stack.Screen
            name="PrescriptionBoard"
            component={sideDrawerView}
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
