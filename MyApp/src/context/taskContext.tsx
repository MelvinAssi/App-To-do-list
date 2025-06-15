import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { Task, TaskState } from "../types/task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../hooks/useAuthContext";

type TaskContextType = {
    tasks: Task[];
    createTask: (task: Task) => void;
    readTask: () => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: number) => void;
    evaluateTaskState: (task: Task) => Task;
};

export const taskContext = createContext<TaskContextType | null>(null);

const TaskProvider = (props: { children: ReactNode }): ReactElement => {
    const { user,isLoading } = useAuthContext();
    const [tasks, setTasks] = useState<Task[]>([]);
    const getStorageKey = () => (user ? `@tasks_${user.uid}` : '@tasks_guest');

    useEffect(() => {
    if (!isLoading && user) {
        setTasks([])
        readTask();
    }
    }, [user, isLoading]);

    const createTask = async (newTask: Task) => {
        try {
            const storageKey = getStorageKey();
            const existing = await AsyncStorage.getItem(storageKey);
            const oldTasks: Task[] = existing ? JSON.parse(existing) : [];
            const updatedTasks = [...oldTasks, newTask];
            await AsyncStorage.setItem(storageKey, JSON.stringify(updatedTasks));
            setTasks(updatedTasks); 
        } catch (e) {
            console.error('Erreur de la création :', e);
        }
    };

    const readTask = async () => {
    try {
        const storageKey = getStorageKey();
        const jsonValue = await AsyncStorage.getItem(storageKey);
        if (jsonValue !== null) {
        const rawTasks: Task[] = JSON.parse(jsonValue);
        const updatedTasks = rawTasks.map(evaluateTaskState);
        setTasks(updatedTasks);
        await updateData(updatedTasks);
        }
    } catch (e) {
        console.error('Erreur de lecture', e);
    }
    };

    const updateTask = (updatedTask: Task) => {
        //if(user)updateTaskInFirestore(user.uid,evaluateTaskState(updatedTask));
        const updatedTasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        );

        const evaluatedTasks = updatedTasks.map(evaluateTaskState);
        
        setTasks(evaluatedTasks);
        updateData(evaluatedTasks);
    };


    const deleteTask = async (id: number) => {
        try {
            //if(user)deleteTaskFromFirestore(user?.uid,id)
            const updatedTasks = tasks.filter(task => task.id !== id);            
            setTasks(updatedTasks);
            await AsyncStorage.setItem(getStorageKey(), JSON.stringify(updatedTasks));
        } catch (e) {
            console.error('Erreur de suppression :', e);
        }
    };

    const updateData = async (updated?: Task[]) => {
        const storageKey = getStorageKey();
        try {
            await AsyncStorage.setItem(storageKey, JSON.stringify(updated ?? tasks));
        } catch (e) {
            console.error('Erreur de la maj', e);
        }
    };

    const evaluateTaskState = (task: Task): Task => {
    if (task.state === TaskState.Completed) {
        return task;
    }
    

    const now = new Date();

    if (task.hasDueDate && task.dueDate) {
        const dueDate = new Date(task.dueDate);        
        if (task.hasDueTime && task.dueTime) {
        const dueTime = new Date(task.dueTime);
        dueDate.setHours(dueTime.getHours(), dueTime.getMinutes(), 0, 0);
        } else {
        dueDate.setHours(23, 59, 59, 999);
        }
        if (dueDate < now) {
        return { ...task, state: TaskState.Overdue };
        }
    }
    
    return { ...task, state: TaskState.InProgress };
    };

    return (
        <taskContext.Provider value={{ tasks, createTask, readTask, updateTask, deleteTask,evaluateTaskState }}>
            {props.children}
        </taskContext.Provider>
    );
};

export { TaskProvider };
