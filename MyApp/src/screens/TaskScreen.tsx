import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Task';
import { useFocusEffect } from '@react-navigation/native';

const TaskScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

useFocusEffect(
  useCallback(() => {
    getData();
  }, [])
);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@ma_clé');
      if (jsonValue !== null) {
        setTasks(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Erreur de lecture', e);
    }
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
    AsyncStorage.setItem('@ma_clé', JSON.stringify(updatedTasks));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Liste des tâches  :</Text>
      <Button title="update" onPress={getData}></Button>
      {tasks.map((task) => (
        <View key={task.id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity
            style={task.isDone ? styles.taskMarkerDone : styles.taskMarker}
            onPress={() => toggleTask(task.id)}
          />
          <Text style={{ marginLeft: 10 }}>{task.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
  },
});

export default TaskScreen;
