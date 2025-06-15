import { createStackNavigator } from '@react-navigation/stack';
import { Task, TaskState } from '../types/task';
import AddTaskScreen from '../screens/AddTaskScreen';
import DetailTaskScreen from '../screens/DetailTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import { TouchableOpacity, Text } from 'react-native';
import { useTasks } from '../hooks/useTasks';

export type CrudStackParamList = {
  AddTask: undefined;
  DetailTask: { task: Task };
  EditTask: { task: Task };
};

const StackCrud = createStackNavigator<CrudStackParamList>();

const CrudNavigator = () => {
  const { updateTask,evaluateTaskState } = useTasks();

  const toggleTaskState = (task: Task) => {
    
    if (task.state === TaskState.Completed) {
      task.state = TaskState.InProgress;
    }else{
      task.state = TaskState.Completed;
    }    
    updateTask(task);
    
    return evaluateTaskState(task).state;
  };

  const getTaskColor = (state: TaskState) => {
    switch (state) {
      case TaskState.Completed:
        return '#00ADB5';
      case TaskState.Overdue:
        return 'red';
      case TaskState.InProgress:
      default:
        return '#EEEEEE';
    }
  };

  const getTaskLabel = (state: TaskState) => {
    switch (state) {
      case TaskState.Completed:
        return 'Terminé';
      case TaskState.Overdue:
        return 'En retard';
      case TaskState.InProgress:
      default:
        return 'En cours';
    }
  };


  return (
    <StackCrud.Navigator>
      <StackCrud.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{
          title: 'Ajouter une tâche',
          headerStyle: {
            backgroundColor: '#222831',
          },
          headerTintColor: '#EEEEEE',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <StackCrud.Screen
        name="DetailTask"
        component={DetailTaskScreen}
        options={({ route }) => ({
          title: 'Détail de la tâche',
          headerStyle: {
            backgroundColor: '#393E46',
          },
          headerTintColor: '#EEEEEE',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => {route.params.task.state=toggleTaskState(route.params.task)}}
                  >
                    <Text style={{ color: getTaskColor(route.params.task.state), fontWeight: 'bold' }}>
                      {getTaskLabel(route.params.task.state)}
                    </Text>
                </TouchableOpacity>
          ),
        })}
      />
      <StackCrud.Screen
        name="EditTask"
        component={EditTaskScreen}
        options={({ route }) => ({
          title: 'Éditer la tâche',
          headerStyle: {
            backgroundColor: '#393E46',
          },
          headerTintColor: '#EEEEEE',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
            headerRight: () => (
              <TouchableOpacity
                  style={{ marginRight: 15 }}
                  onPress={() => {route.params.task.state=toggleTaskState(route.params.task)}}
                >
                  <Text style={{ color: getTaskColor(route.params.task.state), fontWeight: 'bold' }}>
                    {getTaskLabel(route.params.task.state)}
                  </Text>
              </TouchableOpacity>
          ),
        })}
      />
    </StackCrud.Navigator>
  );
};

export default CrudNavigator;
