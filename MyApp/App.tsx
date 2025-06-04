import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigations/AppNavigator';
import { TaskProvider } from './src/service/taskContext';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <TaskProvider>
        <AppNavigator />
      </TaskProvider>      
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;