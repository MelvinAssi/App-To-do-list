import { View, Button, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types/Task';
import { RootTabParamList } from '../navigations/AppNavigator';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTasks } from '../hooks/useTasks';
import { StackNavigationProp } from '@react-navigation/stack';


type DetailTaskRouteProp = RouteProp<RootTabParamList, 'DetailTask'>;
type NavigationProp = StackNavigationProp<RootTabParamList>;
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

    return(
        <View style={styles.container}>
            <Text>{task.title}</Text>
            <Text>{task.description}</Text>
            <Text>Crée le {new Date(task.createdAt).toLocaleDateString()}</Text>
            <Text>Date limite le {new Date(task.limitDate).toLocaleDateString()}</Text>
            <Text>{task.isDone?"Terminer":"En cours"}</Text>
            <TouchableOpacity  onPress={deleteButtton} style={undefined} ><Text style={{fontWeight:'bold',fontSize:24,color:'black'}}>Suprimer</Text></TouchableOpacity>

        </View>
    );

};


const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    display:'flex',
    justifyContent:'center',
    alignContent:"center",
  },
});

export default DetailTaskScreen;