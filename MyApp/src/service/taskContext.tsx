import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { Task } from "../types/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TaskContextType = {
    tasks: Task[];
    createTask: (task: Task) => void;
    readTask: () => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: number) => void;
};

export const taskContext = createContext<TaskContextType | null>(null);

const TaskProvider = (props: { children: ReactNode }): ReactElement => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [read, setRead] = useState(false);
    const nameRepo = '@ma_clé';

    useEffect(() => {
        if (!read) {
            readTask();
            setRead(true);
        } else {
            updateData();
        }
    }, [tasks]);

    const createTask = async (newTask: Task) => {
        try {
            const existing = await AsyncStorage.getItem(nameRepo);
            const oldTasks: Task[] = existing ? JSON.parse(existing) : [];
            const updatedTasks = [...oldTasks, newTask];
            await AsyncStorage.setItem(nameRepo, JSON.stringify(updatedTasks));
            setTasks(updatedTasks); // Ajouter ça pour mise à jour immédiate
        } catch (e) {
            console.error('Erreur de la création :', e);
        }
    };

    const readTask = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(nameRepo);
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
        try {
            await AsyncStorage.setItem(nameRepo, JSON.stringify(tasks));
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
