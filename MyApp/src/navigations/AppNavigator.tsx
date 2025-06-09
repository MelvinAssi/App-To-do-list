import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoadingScreen from '../screens/LoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import DetailTaskScreen from '../screens/DetailTaskScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Task } from '../types/Task';
export type RootTabParamList = {
  Loading:undefined;
  SignIn: undefined;
  SignUp :undefined;
  Main :undefined
  Home: undefined;
  Task:undefined;
  Settings:undefined;
  AddTask: undefined;
  DetailTask :{task:Task};
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootTabParamList>();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
    <Tab.Screen name="Task" component={TaskScreen} options={{ title: 'Tâches' }} />
    <Tab.Screen name="Settings" component={SettingsScreen}  />
  </Tab.Navigator>
);
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{title: 'Connexion'}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{title: 'Inscription'}}/>
        <Stack.Screen name="Main" component={TabNavigator} />  
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{title: 'Ajouter'}}/>    
        <Stack.Screen name="DetailTask" component={DetailTaskScreen} options={{title: 'Detail'}}/>
      </Stack.Navigator>      
    </NavigationContainer>
  );
};

export default AppNavigator;