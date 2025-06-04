import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Task } from '../types/Task';
import { useTasks } from '../hooks/useTasks';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddTaskScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [limite, setLimite] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const{createTask} = useTasks();

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      createdAt:new Date(),
      isDone: false,
      title,
      description,
      limite,
      limitDate: date || new Date(),
    };

    createTask(newTask);
    setTitle('');
    setDescription('');
    setDate(null);
  };

  return (
    <SafeAreaView style={styles.page}>
      <Text>Ajouter une tâche</Text>
      <TextInput
        placeholder="Nom de la tâche"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description de la tâche"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Text>
      Mettre une limite 
      <TouchableOpacity
        style={limite ? styles.taskMarkerDone : styles.taskMarker}
        onPress={() => setLimite(!limite)}
      />
      </Text>

      {limite &&(
        <TouchableOpacity  onPress={() => setShowModal(true)}>
          <Text 
          style={styles.input} 
          
          >{date?new Date(date).toLocaleDateString():"Sélectionner une date"}
          </Text>
        </TouchableOpacity>
      )}


      <DateTimePickerModal
        isVisible={showModal}
        mode="datetime"
        locale="fr_FR"
        onConfirm={(selectedDate) => {
          setDate(selectedDate);
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />

      <Button title="Ajouter" onPress={handleAddTask} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page:{
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },



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

export default AddTaskScreen;
