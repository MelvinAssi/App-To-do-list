import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Task, TaskState } from "../types/task";
import { useNavigation } from "@react-navigation/native";
import { useTasks } from "../hooks/useTasks";
import { RootParamList } from "../navigations/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootParamList>;

type TaskViewProps = {
  task: Task;
};

const TaskView = ({ task }: TaskViewProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { updateTask } = useTasks();

  const showDetail = () => {
    navigation.navigate('Crud', { screen: 'DetailTask', params: { task } });
  };

  const toggleTaskState = (e: GestureResponderEvent) => {
    e.stopPropagation();

    const updatedTask: Task = {
      ...task,
      state:
        task.state === TaskState.Completed
          ? TaskState.InProgress
          : TaskState.Completed,
    };

    updateTask(updatedTask);
  };

  const getMarkerStyle = () => {
    switch (task.state) {
      case TaskState.Completed:
        return styles.taskMarkerDone;
      case TaskState.Overdue:
        return styles.taskMarkerOverdue;
      case TaskState.InProgress:
      default:
        return styles.taskMarker;
    }
  };

  return (
    <TouchableOpacity onPress={showDetail} key={task.id} style={styles.taskView}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <TouchableOpacity
        style={getMarkerStyle()}
        onPress={toggleTaskState}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#222831",
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
  },
  taskTitle: {
    fontSize: 15,
    color: "#393E46",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#393E46',
    borderColor: '#222831',
    marginRight: 15,
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#00ADB5',
    marginRight: 15,
  },
  taskMarkerOverdue: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: 'red',
    marginRight: 15,
  },
});

export default TaskView;
