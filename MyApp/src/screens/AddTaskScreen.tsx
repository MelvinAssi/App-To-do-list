import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Task';

const AddTaskScreen: React.FC = () => {
  const [text, setText] = useState('');

const storeData = async (newTask: Task) => {
  try {
    //await AsyncStorage.setItem('@ma_clé', JSON.stringify([]));
    const existing = await AsyncStorage.getItem('@ma_clé');
    console.log(existing)
    const tasks: Task[] = existing ? JSON.parse(existing) : [];
    console.log(tasks)

    const updatedTasks = [...tasks, newTask];

    await AsyncStorage.setItem('@ma_clé', JSON.stringify(updatedTasks));
  } catch (e) {
    console.error('Erreur :', e);
  }
};

const handleAddTask = () => {
  const newTask: Task = {
    id: Date.now(),
    isDone: false,
    title: text,
  };

  storeData(newTask);
  setText('');
};

  return (
    <View style={styles.container}>
      <Text>Ajouter une tâche</Text>
      <Text>Ajouter une tâche</Text>
      <Text>Ajouter une tâche</Text>
      <Text>Ajouter une tâche</Text>
      <TextInput
        placeholder="Nom de la tâche"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Ajouter" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
});

export default AddTaskScreen;
