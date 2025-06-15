export interface Task {
  id: number;  
  state: TaskState;  
  title: string;
  description: string;
  createdAt: string;        
  hasDueDate: boolean;
  dueDate: string | null;   
  hasDueTime: boolean;
  dueTime: string | null;
}


export enum TaskState {
  InProgress = "in_progress",
  Completed = "completed",
  Overdue = "overdue",
}