import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import DetailTaskScreen from '../screens/DetailTaskScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Task } from '../types/Task';
export type RootTabParamList = {
  Main :undefined
  Home: undefined;
  Task:undefined;
  AddTask: undefined;
  DetailTask :{task:Task};
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootTabParamList>();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
    <Tab.Screen name="Task" component={TaskScreen} options={{ title: 'Tâches' }} />
    <Tab.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Ajouter' }} />
  </Tab.Navigator>
);
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />      
        <Stack.Screen name="DetailTask" component={DetailTaskScreen} options={{title: 'Detail'}}/>
      </Stack.Navigator>      
    </NavigationContainer>
  );
};

export default AppNavigator;