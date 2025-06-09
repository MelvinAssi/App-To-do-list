import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { Task } from "../types/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../hooks/useAuthContext";

type TaskContextType = {
    tasks: Task[];
    createTask: (task: Task) => void;
    readTask: () => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: number) => void;
};

export const taskContext = createContext<TaskContextType | null>(null);

const TaskProvider = (props: { children: ReactNode }): ReactElement => {
    const { user,isLoading } = useAuthContext();
    const [tasks, setTasks] = useState<Task[]>([]);
    const getStorageKey = () => (user ? `@tasks_${user.uid}` : '@tasks_guest');

    useEffect(() => {
    if (!isLoading && user) {
        readTask();
        console.log("init"+getStorageKey())
    }
    }, [user, isLoading]);
    useEffect(() => {
        if (!isLoading && user) {
            updateData();
            console.log("update"+getStorageKey())
        }
    }, [tasks]);

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
                setTasks(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error('Erreur de lecture', e);
        }
    };

    const updateTask = (updatedTask: Task) => {
        const updatedTasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    const updateData = async () => {
        const storageKey = getStorageKey();
        try {
            await AsyncStorage.setItem(storageKey, JSON.stringify(tasks));
        } catch (e) {
            console.error('Erreur de la maj', e);
        }
    };

    return (
        <taskContext.Provider value={{ tasks, createTask, readTask, updateTask, deleteTask }}>
            {props.children}
        </taskContext.Provider>
    );
};

export { TaskProvider };
