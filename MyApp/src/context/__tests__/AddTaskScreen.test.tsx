import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddTaskScreen from '../src/screens/AddTaskScreen';
import { TaskProvider } from '../src/context/taskContext';
import { NavigationContainer } from '@react-navigation/native';

describe('AddTaskScreen', () => {
  it('affiche le champ et permet de taper une tâche', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <TaskProvider>
          <AddTaskScreen />
        </TaskProvider>
      </NavigationContainer>
    );

    const input = getByPlaceholderText('Nom de la tâche');
    expect(input).toBeTruthy();
  });
});
