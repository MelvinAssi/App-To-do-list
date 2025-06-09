import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Task } from '../types/Task';
import { RootTabParamList } from '../navigations/AppNavigator';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTasks } from '../hooks/useTasks';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import CalendarIcon from '../assets/icons/calendar_month_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

type DetailTaskRouteProp = RouteProp<RootTabParamList, 'DetailTask'>;
type NavigationProp = StackNavigationProp<RootTabParamList>;
type Props = {
  route: DetailTaskRouteProp;
};

const DetailTaskScreen: React.FC<Props> = ({ route }) => {
  const { task } = route.params;
  const navigation = useNavigation<NavigationProp>();
  const{deleteTask,updateTask}=useTasks();
  const deleteButtton = () =>{
      deleteTask(task.id)
      navigation.goBack()
  }
  const stateButton =(task:Task) =>{
    task.isDone=!task.isDone
    updateTask(task)
    navigation.goBack()
  }
  const update =(task:Task)=>{
    updateTask(task)
    
  }

    return(
        <SafeAreaView style={styles.page}>
          <View style={styles.taskheader}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={task.isDone ? styles.taskStateDone : styles.taskState}>{task.isDone?"Terminer":"En cours"}</Text>
          </View>
          <View style={styles.taskAttribut}>
            <View style={styles.taskAttribut_Left}>
              <Icons name="calendar" size={24} color="black" />
              <Text style={styles.taskText}> Crée le :</Text>
            </View>
              <Text style={styles.taskText}>{new Date(task.createdAt).toLocaleDateString()}</Text>
          </View>
          <View style={styles.taskAttribut}>
            <View style={styles.taskAttribut_Left}>
              <Icons name="calendar" size={24} color="black" />
              <Text style={styles.taskText}> Date limite le :</Text>
            </View>              
            <Text style={styles.taskText}>{new Date(task.limitDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.taskAttribut}>
            <View style={styles.taskAttribut_Left}>
              <Icons name="clock-o" size={24} color="black" />
              <Text style={styles.taskText}> Heure :</Text>
            </View>              
            <Text style={styles.taskText}>{new Date(task.limitDate).toLocaleTimeString()}</Text>
          </View>
          <View style={styles.taskAttribut_Left}>
              <MaterialIcons name="description" size={24} color="black" />
              <Text style={styles.taskText}> Description :</Text>
          </View>             
          <Text style={styles.taskDescription}>{task.description}</Text>
          <TextInput
                  placeholder="Description de la tâche"
                  value={task.description}
                  onChangeText={()=>update(task)}
            />

          <TouchableOpacity  onPress={()=>stateButton(task)} style={undefined} >
            <Text style={{fontWeight:'bold',fontSize:24,color:'black'}}>{task.isDone?"Annuler":"Valider"}</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={deleteButtton} style={undefined} >
            <Text style={{fontWeight:'bold',fontSize:24,color:'black'}}>Suprimer</Text>
          </TouchableOpacity>
          

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
  taskheader:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  taskTitle:{
    fontSize:40,
    fontWeight:'bold',
    marginVertical:10,
  },
  taskState:{
    marginVertical:10,
    color:'red'
  },
  taskStateDone:{
    marginVertical:10,
    color:'green'
  },

  taskAttribut:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    borderTopWidth:0.5,
    borderBottomWidth:0.5,  
  },
    taskAttribut_Left:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
  },
  taskText:{
    fontSize:24,
    marginVertical:5,
  },
  taskDescription:{
    minHeight:100,
    fontSize:20,
    marginVertical:5,
  },
});

export default DetailTaskScreen;