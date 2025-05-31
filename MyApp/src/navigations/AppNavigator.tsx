import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
export type RootTabParamList = {
  Home: undefined;
  Task:undefined;
  AddTask: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
        <Tab.Screen name="Task" component={TaskScreen} options={{ title: 'Task' }} />
        <Tab.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Ajouter' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;