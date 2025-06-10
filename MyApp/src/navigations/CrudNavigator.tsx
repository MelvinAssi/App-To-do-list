import { createStackNavigator } from '@react-navigation/stack';
import { Task } from '../types/Task';
import AddTaskScreen from '../screens/AddTaskScreen';
import DetailTaskScreen from '../screens/DetailTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { useTasks } from '../hooks/useTasks';



export type CrudStackParamList = {
  AddTask: undefined;
  DetailTask: { task: Task };
  EditTask: { task: Task };
};

const StackCrud = createStackNavigator<CrudStackParamList>();
const CrudNavigator = () => {
  const { updateTask } = useTasks();

  return (
    <StackCrud.Navigator>
      <StackCrud.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{ title: 'Ajouter une tâche' }}
      />
      <StackCrud.Screen
        name="DetailTask"
        component={DetailTaskScreen}
        options={({ route }) => ({
          title: `Détail de la tâche`,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                route.params.task.isDone = !route.params.task.isDone
                updateTask(route.params.task);
              }}
            >
              <Text style={{ color: route.params.task.isDone ? 'green':'blue' }}>
                {route.params.task.isDone ? 'Terminer' : 'En cours'}
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <StackCrud.Screen
        name="EditTask"
        component={EditTaskScreen}
        options={({ route }) => ({
          title: `Editer la tâche`,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                route.params.task.isDone = !route.params.task.isDone
                updateTask(route.params.task);
              }}
            >
              <Text style={{ color: route.params.task.isDone ? 'green':'blue' }}>
                {route.params.task.isDone ? 'Terminer' : 'En cours'}
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
    </StackCrud.Navigator>
  );
};


export default CrudNavigator;