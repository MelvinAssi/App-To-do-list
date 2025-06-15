import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Task } from '../types/task';
import { useTasks } from '../hooks/useTasks';
import { SearchBar } from 'react-native-elements';
import { RootParamList } from '../navigations/AppNavigator';
import TaskView from '../components/TaskView';

type NavigationProp = StackNavigationProp<RootParamList>;


const TaskScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { tasks, updateTask } = useTasks();

  const [searchValue, setSearchValue] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  

  useEffect(() => {
    searchFunction(searchValue);
  }, [tasks]);



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



  return (
    <View style={styles.page}>
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
        onChangeText={(text: string) => searchFunction(text)} 
        platform="default"
        round
        lightTheme
        containerStyle={{ backgroundColor: '#EEEEEE', borderBlockColor: '#EEEEEE' }}
        inputContainerStyle={{ backgroundColor: 'white' }}
        searchIcon={{ size: 24, color: "#393E46" }} 
        clearIcon={{ size: 24, color: "#393E46" }} 
        cancelIcon={{ size: 24, color: "#393E46" }}
      />

      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => <TaskView task={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 50 }}
      />

      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={{ fontWeight: '500', fontSize: 40, color: 'white' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    backgroundColor:'#EEEEEE',
  },
  title1: {
    fontSize: 30,
    marginVertical: 10,
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
    backgroundColor: '#00ADB5',
    borderColor:'#222831',
    borderWidth:1,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default TaskScreen;
