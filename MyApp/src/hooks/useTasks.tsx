import { useContext } from "react";
import { taskContext } from "../context/taskContext";

export const useTasks = () => {
    const context = useContext(taskContext);
    if (!context) {
        throw new Error("useTasks doit être utilisé dans un TaskProvider");
    }
    return context;
};