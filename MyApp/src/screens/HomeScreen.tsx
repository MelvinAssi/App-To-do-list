import React, { use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '../hooks/useTasks';
import { ScrollView } from 'react-native-gesture-handler';
import { Task } from '../types/Task';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '../navigations/AppNavigator';

type NavigationProp = StackNavigationProp<RootTabParamList>;

const HomeScreen: React.FC = () => {
   const navigation = useNavigation<NavigationProp>();
  const{tasks,updateTask} = useTasks();
  const [todayTasksToDo,setTodayTasksToDo] =useState<Task[]>()
  const [todayTasksDone,setTodayTasksDone] =useState<Task[]>()
  const today = new Date();


  const todayTasks = tasks.filter((task: Task) => {
    if (!task.limite || !task.limitDate) return false;
    const taskDate = new Date(task.limitDate);
    return (
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate()
    );
  });
  const showDetail = (task:Task) =>{
    navigation.navigate("DetailTask",{task});
  }

  useEffect(()=>{
    setTodayTasksToDo(
      todayTasks.filter((task:Task)=>!task.isDone)
    );
    setTodayTasksDone(
      todayTasks.filter((task:Task)=>task.isDone)
    );

  },[tasks])


  const toggleTask=(task:Task)=>{
    task.isDone=!task.isDone;
    updateTask(task);

  }

  return (
    <SafeAreaView style={styles.page}>
        <Text style={styles.title1}>Taches du Jour</Text>
        <ScrollView style={styles.taskScrollView}>
          <Text style={styles.title2}>Taches en cours</Text>
          {
            todayTasksToDo?(
              <>                
                {todayTasksToDo.map((task) => (
                  <TouchableOpacity onPress={()=>showDetail(task)}  key={task.id} style={styles.taskView}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <TouchableOpacity
                      style={task.isDone ? styles.taskMarkerDone : styles.taskMarker}
                      onPress={() => toggleTask(task)}>                      
                    </TouchableOpacity>
                  </TouchableOpacity>
              ))}
              </>
            ):(
            <>
              <Text>Aucune taches à faire</Text>
            </>
            )
          }
          {
            todayTasksDone ? (
              <>
                <Text style={styles.title2}>Taches terminé</Text>
                {todayTasksDone.map((task) => (
                  <TouchableOpacity onPress={()=>showDetail(task)}  key={task.id} style={styles.taskView}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <TouchableOpacity
                      style={task.isDone ? styles.taskMarkerDone : styles.taskMarker}
                      onPress={() => toggleTask(task)}>                      
                    </TouchableOpacity>
                  </TouchableOpacity>
              ))}
              </>
            ):(<></>)
          }
        </ScrollView>
        <Text>{}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page:{
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    flex:1,
    display:'flex',
  },
  title1: {    
    fontSize:30,
    marginVertical:5,
  },
  title2: {    
    fontSize:20,
    marginVertical:5,
  },
  taskScrollView:{
    display:'flex',  
  },
  taskView:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:20,
    height:70,
    marginVertical:5,
    borderWidth:2,
    borderColor:'black',
    borderRadius:10,
  },
  taskTitle:{
    fontSize:15,
  },
  taskMarkerDone:{
    height:20,
    width:20,
    borderRadius:10,
    borderWidth:2,
    borderColor:'black',
    backgroundColor:'green'
  },
    taskMarker:{
    height:20,
    width:20,
    borderRadius:10,
    borderWidth:2,
    borderColor:'black',
    backgroundColor:'white'
  }

});

export default HomeScreen;
