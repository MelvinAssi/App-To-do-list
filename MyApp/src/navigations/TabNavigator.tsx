
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
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil', tabBarIcon:({color, size}) => (
      <MaterialIcons name="home" color={color} size={size} />
    ),
    }} />
    <Tab.Screen name="Task" component={TaskScreen} options={{ title: 'Tâches' , tabBarIcon:({color, size}) => (
      <MaterialIcons name="task" color={color} size={size} />
    ),
    }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Paramètres' , tabBarIcon:({color, size}) => (
      <MaterialIcons name="settings" color={color} size={size} />
    ),
    }} />
  </Tab.Navigator>
);


export default TabNavigator;