
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import SettingsScreen from '../screens/SettingsScreen';




export type RootTabParamList = {
  Home: undefined;
  Task:undefined;
  Settings:undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();


const TabNavigator = () => (
  <Tab.Navigator 
    screenOptions={{
      headerShown: true ,
      headerStyle: { backgroundColor: '#222831'},
      headerTintColor: '#EEEEEE',
      headerTitleStyle: {fontWeight: 'bold'}, 
      tabBarStyle:{backgroundColor:'#222831'},
      tabBarInactiveTintColor:'#EEEEEE',
      tabBarActiveTintColor: '#00ADB5',
    }} 
    >
    <Tab.Screen name="Home" component={HomeScreen} options={{
        title: 'Tâches du Jour', 
        tabBarIcon:({color, size}) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      }} 
    />
    <Tab.Screen name="Task" component={TaskScreen} options={{ 
        title: 'Liste des tâches' , 
        tabBarIcon:({color, size}) => (
          <MaterialIcons name="task" color={color} size={size} />
      ),
    }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ 
        title: 'Paramètres' , 
        tabBarIcon:({color, size}) => (
          <MaterialIcons name="settings" color={color} size={size} />
    ),
    }} />
  </Tab.Navigator>
);


export default TabNavigator;