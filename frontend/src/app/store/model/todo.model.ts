export interface Todo{
    id: number,
    title: string,
    description: string,
    dueDate: Date,
    isCompleted: boolean,
    created: Date,
    lastUpdated: Date | null
}

export interface TodoModel{
    list:Todo[],
    todoObj: Todo,
    errorMessage:string
}