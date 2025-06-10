import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import LoadingScreen from '../screens/LoadingScreen';
import { createStackNavigator } from '@react-navigation/stack';

import CrudNavigator, { CrudStackParamList } from './CrudNavigator';
import TabNavigator ,{RootTabParamList} from './TabNavigator';
import AuthNavigator,{AuthStackParamList} from './AuthNavigator';
import { useAuthContext } from '../hooks/useAuthContext';


export type RootParamList = {
  Loading:undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main :NavigatorScreenParams<RootTabParamList>;
  Crud: NavigatorScreenParams<CrudStackParamList>;
};


const Stack = createStackNavigator<RootParamList>();


const AppNavigator: React.FC = () => {
  const { user, isLoading } = useAuthContext();

    if(isLoading){
      return <LoadingScreen/>;
      
    }

    return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Crud" component={CrudNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthNavigator} />
          </>
          
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;