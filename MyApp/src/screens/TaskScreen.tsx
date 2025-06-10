import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Task } from '../types/Task';
import { useTasks } from '../hooks/useTasks';
import { SearchBar } from 'react-native-elements';
import { RootParamList } from '../navigations/AppNavigator';

type NavigationProp = StackNavigationProp<RootParamList>;

const TaskScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { tasks, updateTask } = useTasks();

  const [searchValue, setSearchValue] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    searchFunction(searchValue);
  }, [tasks]);

  const toggleTask = (task: Task) => {
    task.isDone = !task.isDone;
    updateTask(task);
  };

  const showDetail = (task: Task) => {
    navigation.navigate('Crud',{screen :'DetailTask',params:{ task }});
  };

  const addTask = () => {
    navigation.navigate('Crud',{screen :'AddTask'});
  };

  const searchFunction = (text: string) => {
    const filtered = tasks.filter(task =>
      task.title.toUpperCase().includes(text.toUpperCase())
    );
    setFilteredTasks(filtered);
    setSearchValue(text);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      onPress={() => showDetail(item)}
      style={styles.taskView}
    >
      <Text style={styles.taskTitle}>{item.title}</Text>
      <TouchableOpacity
        style={item.isDone ? styles.taskMarkerDone : styles.taskMarker}
        onPress={() => toggleTask(item)}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title1}>Liste des tâches :</Text>
      {/*
              <TextInput
        placeholder="Rechercher une tâche..."
        value={searchValue}
        onChangeText={searchFunction}
        style={styles.searchInput}
      />  
      
      */}

      <SearchBar
        placeholder="Rechercher..."
        value={searchValue}
        onChangeText={searchFunction}        
        platform="default"
        round
        lightTheme
        containerStyle={{ backgroundColor: 'white'}}
        inputContainerStyle={{ backgroundColor: 'white' }}
        searchIcon={{ size: 24, color: "black" }} 
        clearIcon={{ size: 24, color: "black" }} 
        cancelIcon={{ size: 24, color: "black" }}
      />

      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 50 }}
      />

      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={{ fontWeight: '500', fontSize: 40, color: 'white' }}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  title1: {
    fontSize: 30,
    marginVertical: 10,
  },
  taskView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  taskTitle: {
    fontSize: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 25,
    backgroundColor: 'blue',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
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

export default TaskScreen;
