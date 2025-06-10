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
  const [hasDueDate, setHasDueDate] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [hasDueTime, sethasDueTime] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const [showModalDate, setShowModalDate] = useState(false);
  const [showModalTime, setShowModalTime] = useState(false);
  const{createTask} = useTasks();

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      createdAt:new Date(),
      isDone: false,
      title,
      description,
      hasDueDate,
      dueDate: date || new Date(),
      hasDueTime,
      dueTime: time || new Date(),

    };

    createTask(newTask);
    setTitle('');
    setDescription('');
    setDate(null);
    setTime(null);
    setHasDueDate(false);
    sethasDueTime(false);
  };

  return (
    <View style={styles.page}>
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
      <View style={styles.toogleAndLabel}>
        <TouchableOpacity
          style={hasDueDate ? styles.taskMarkerDone : styles.taskMarker}
          onPress={() => setHasDueDate(!hasDueDate)}
        />
        <Text>Mettre une date limite </Text>
      </View>
      {hasDueDate &&(
        <>
          <TouchableOpacity  onPress={() => setShowModalDate(true)}>
            <Text style={styles.input}>
              {date?new Date(date).toLocaleDateString():"Sélectionner une date"}
            </Text>
          </TouchableOpacity>

          <View style={styles.toogleAndLabel}>
            <TouchableOpacity
              style={hasDueTime ? styles.taskMarkerDone : styles.taskMarker}
              onPress={() => sethasDueTime(!hasDueTime)}
            />
            <Text>Mettre une heure limite</Text>
          </View>
        </>
      )}
      {hasDueTime &&(
        <TouchableOpacity  onPress={() => setShowModalTime(true)}>
          <Text style={styles.input}>
            {time?new Date(time).toLocaleTimeString():"Sélectionner une heure"}
          </Text>
        </TouchableOpacity>
      )}


      <DateTimePickerModal
        isVisible={showModalDate}
        mode="date"
        locale="fr_FR"
        onConfirm={(selectedDate) => {
          setDate(selectedDate);
          setShowModalDate(false);
        }}
        onCancel={() => setShowModalDate(false)}
      />
      <DateTimePickerModal
        isVisible={showModalTime}
        mode="time"
        locale="fr_FR"
        onConfirm={(selectedTime) => {
          setTime(selectedTime);
          setShowModalTime(false);
        }}
        onCancel={() => setShowModalTime(false)}
      />

      <Button title="Ajouter" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  page:{
    paddingHorizontal:20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius:10,
    padding: 10,
    marginVertical: 10,
  },
  toogleAndLabel:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
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
