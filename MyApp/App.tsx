import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigations/AppNavigator';
import { TaskProvider } from './src/context/taskContext';
import {AuthProvider}  from './src/context/authContext';


const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <TaskProvider>
          <AppNavigator />
        </TaskProvider>   
      </AuthProvider>   
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
});

export default App;