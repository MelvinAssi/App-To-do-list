import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '../hooks/useTasks';
import { Task, TaskState } from '../types/task';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../navigations/AppNavigator';
import TaskView from '../components/TaskView';

type NavigationProp = StackNavigationProp<RootParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { tasks } = useTasks();
  const [todayTasksToDo, setTodayTasksToDo] = useState<Task[]>([]);
  const [todayTasksDone, setTodayTasksDone] = useState<Task[]>([]);
  const [todayTasksOverdue, setTodayTasksOverdue] = useState<Task[]>([]);
  const today = new Date();

  const todayTasks = tasks.filter((task: Task) => {
    if (!task.hasDueDate || !task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return (
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate()
    );
  });

  useEffect(() => {
    setTodayTasksToDo(
      todayTasks.filter((task) => task.state === TaskState.InProgress)
    );
    setTodayTasksDone(
      todayTasks.filter((task) => task.state === TaskState.Completed)
    );
    setTodayTasksOverdue(
      todayTasks.filter((task) => task.state === TaskState.Overdue)
    );
  }, [tasks]);

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={todayTasksToDo}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskView task={item} />}
        ListHeaderComponent={
          <>
            <Text style={styles.title2}>Tâches en cours</Text>
            {todayTasksToDo.length === 0 && (
              <Text>Aucune tâche à faire</Text>
            )}
          </>
        }
        ListFooterComponent={
          <>
            {todayTasksOverdue.length > 0 && (
              <>
                <Text style={styles.title2}>Tâches en retard</Text>
                {todayTasksOverdue.map((task) => (
                  <TaskView key={task.id} task={task} />
                ))}
              </>
            )}
            {todayTasksDone.length > 0 && (
              <>
                <Text style={styles.title2}>Tâches terminées</Text>
                {todayTasksDone.map((task) => (
                  <TaskView key={task.id} task={task} />
                ))}
              </>
            )}
          </>
        }
        
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    flex: 1,
  },
  title2: {
    fontSize: 20,
    marginVertical: 5,
  },
});

export default HomeScreen;
