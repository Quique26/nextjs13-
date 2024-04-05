import { ITask } from "./types/tasks";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async ():Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks`,{ cache: "no-store" })
    const todos = await res.json()
    return todos;
}

export const addTodo = async (todo: ITask, file: File | null): Promise<ITask> => {
    const fileName = file ? file.name : "avatardefault.png";

    const taskRes = await fetch(`${baseUrl}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    });

    const formData = new FormData();
    if (file) {
        formData.append("file", file);
    }

    const uploadRes = await fetch("../api/upload", {
        method: "POST",
        body: formData
    });


    const newTodo = await taskRes.json();
    return newTodo;
}


export const editTodo = async (todo: ITask, file: File | null): Promise<ITask> => {
    const taskRes = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })

    const formData = new FormData();
    if (file) {
        formData.append("file", file);
    }

    const uploadRes = await fetch("../api/upload", {
        method: "POST",
        body: formData
    });


    const updatedTodo = await taskRes.json()
    return updatedTodo
}

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`, {
        method: "DELETE",
    })
}

