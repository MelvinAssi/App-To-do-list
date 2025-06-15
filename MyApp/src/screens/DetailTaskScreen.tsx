import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Task } from '../types/Task';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTasks } from '../hooks/useTasks';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import CalendarIcon from '../assets/icons/calendar_month_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { CrudStackParamList } from '../navigations/CrudNavigator';

type DetailTaskRouteProp = RouteProp<CrudStackParamList, 'DetailTask'>;
type NavigationProp = StackNavigationProp<CrudStackParamList>;
type Props = {
  route: DetailTaskRouteProp;
};

const DetailTaskScreen: React.FC<Props> = ({ route }) => {
  const { task } = route.params;
  const navigation = useNavigation<NavigationProp>();
  const{deleteTask}=useTasks();
  const deleteButtton = () =>{
      deleteTask(task.id)
      navigation.goBack()
  }

  const editButton =(task:Task)=>{
    navigation.navigate("EditTask",{task})
  }

    return(
        <View style={styles.page}>
          <View style={styles.taskheader}>
            <Text style={styles.taskTitle}>{task.title}</Text>
          </View>
          <View style={styles.taskAttribut}>
            <View style={styles.taskAttribut_Left}>
              <Icons name="calendar" size={24} color="black" />
              <Text style={styles.taskText}> Crée le :</Text>
            </View>
              <Text style={styles.taskText}>{new Date(task.createdAt).toLocaleDateString()}</Text>
          </View>
          {task.hasDueDate &&(
            <View style={styles.taskAttribut}>
              <View style={styles.taskAttribut_Left}>
                <Icons name="calendar" size={24} color="black" />
                <Text style={styles.taskText}> Date limite le :</Text>
              </View>              
              <Text style={styles.taskText}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Pas de date'}</Text>
            </View>
          )}
         {task.hasDueTime &&(
            <View style={styles.taskAttribut}>
              <View style={styles.taskAttribut_Left}>
                <Icons name="clock-o" size={24} color="black" />
                <Text style={styles.taskText}> Heure :</Text>
              </View>              
              <Text style={styles.taskText}>{task.dueTime ? new Date(task.dueTime).toLocaleTimeString() : 'Pas d\'heure'}</Text>
            </View>
          )}

          <View style={styles.taskAttribut_Left}>
              <MaterialIcons name="description" size={24} color="black" />
              <Text style={styles.taskText}> Description :</Text>
          </View>             
          <Text style={styles.taskDescription}>{task.description}</Text>



          <View style={styles.buttonContainer}>
            <TouchableOpacity  onPress={()=>editButton(task)} style={styles.editButton} >
              <Text style={styles.textButton}>Editer</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={deleteButtton} style={styles.deleteButton} >
              <Text style={styles.textButton}>Suprimer</Text>
            </TouchableOpacity>
          </View>

          

        </View>
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
    color:'#393E46',
    marginVertical:10,

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
    color:'#393E46',
  },
  taskDescription:{
    minHeight:100,
    fontSize:20,
    color:'#393E46',
    marginVertical:5,
  },
  buttonContainer:{
    display:'flex',
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'center'
  },
  editButton:{
    width:100,
    backgroundColor: '#00ADB5',
    borderWidth:2,
    borderBlockColor:'#222831',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  deleteButton:{
    backgroundColor: 'red',
    width:100,
    borderWidth:2,
    borderBlockColor:'#222831',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  textButton:{
    fontWeight:'bold',
    fontSize:16,
    color:'#EEEEEE'
  },
});

export default DetailTaskScreen;