import React, {useEffect} from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Login';
import SideDrawer from './sideDrawer';
import SignUp from './SignUp';
import ForgotPassword from './ForgetPassword';
import PrescriptionBoard from './PrescriptionBoard';
import changePrescriptionStack from './changePrescriptionStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

export default function sideDrawerView(props) {
  const Drawer = createDrawerNavigator();
  
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Drawer.Navigator drawerContent={props => <SideDrawer {...props} />}>
      <Drawer.Screen
        name="changePrescriptionStack"
        component={changePrescriptionStack}
      />
    </Drawer.Navigator>
  );
}
