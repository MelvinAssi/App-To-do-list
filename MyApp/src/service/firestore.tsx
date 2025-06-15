
import firestore, {   doc, getFirestore, setDoc,  } from '@react-native-firebase/firestore';
import { Task } from '../types/task';
import { getApp } from '@react-native-firebase/app';

const app = getApp(); 
const db = getFirestore(app);

export const getTasksFromFirestore = async (userId: string): Promise<Task[]> => {
  const snapshot = await firestore()
    .collection('Users')
    .doc(userId)
    .collection('tasks')
    .get();

  return snapshot.docs.map(doc => doc.data() as Task);
};

export const addTaskToFirestore = async (userId: string, task: Task): Promise<void> => {
  console.log(db,userId,task.id.toString())
  try {
    await firestore()
      .collection('Users')
      .doc(userId)
      .collection('tasks')
      .doc(task.id.toString())
      .set(task);
    console.log("✅ Task ajoutée avec succès");
  } catch (error) {
    console.error("❌ Erreur d'ajout Firestore :", error);
  }
};

export const deleteTaskFromFirestore = async (userId: string, taskId: number): Promise<void> => {
  await firestore()
    .collection('Users')
    .doc(userId)
    .collection('tasks')
    .doc(taskId.toString())
    .delete();
};

export const updateTaskInFirestore = async (userId: string, task: Task): Promise<void> => {
  await firestore()
    .collection('Users')
    .doc(userId)
    .collection('tasks')
    .doc(task.id.toString())
    .set(task, { merge: true });
};
