export interface Task {
    id:number,
    isDone:boolean,
    title:string,
    description:string,
    createdAt:Date,
    hasDueDate: boolean;
    dueDate: Date;
    hasDueTime: boolean;
    dueTime: Date;

}