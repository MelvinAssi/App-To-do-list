import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Task';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '../navigations/AppNavigator';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { taskContext } from '../service/taskContext';
import { useTasks } from '../hooks/useTasks';


type NavigationProp = StackNavigationProp<RootTabParamList>;

const TaskScreen: React.FC = () => {

  const navigation = useNavigation<NavigationProp>();
  //const [tasks, setTasks] = useState<Task[]>([]);
 

  const { tasks,updateTask } = useTasks();



  const toggleTask = (task: Task) => {
    task.isDone = !task.isDone;
    updateTask(task)
  };


  const showDetail = (task:Task) =>{
    navigation.navigate("DetailTask",{task});
  }
  const addTask =() =>{
    navigation.navigate('AddTask');
  }

  return (
    <SafeAreaView style={ styles.page}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Liste des tâches  :</Text>
      <ScrollView style={{}}>
        {tasks.map((task) => (
          <TouchableOpacity onPress={()=>showDetail(task)} key={task.id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity
              style={task.isDone ? styles.taskMarkerDone : styles.taskMarker}
              onPress={() => toggleTask(task)}
            />
            <Text style={{ marginLeft: 10 }}>{task.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    <TouchableOpacity  onPress={addTask} style={styles.addButton} ><Text style={{fontWeight:'bold',fontSize:40,color:'white'}}>+</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page:{
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
  },
  addButton:{
    position:'absolute',
    bottom:50,
    right:25,
    backgroundColor:'blue',
    width:80,
    height:80,
    borderRadius:40,

    display:'flex',
    justifyContent:'center',
    alignItems:'center',


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
