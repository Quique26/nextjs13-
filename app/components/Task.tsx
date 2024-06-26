"use client"

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi"
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps{
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false)
    const [taskToEditText, setTaskToEditText] = useState<string>(task.text)
    const [taskToEditAvatar, setTaskToEditAvatar] = useState<File | null>(null)
    const [avatarFileName, setAvatarFileName] = useState<string>("")

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const editedTaskAvatar = taskToEditAvatar ? taskToEditAvatar : null;

        await editTodo({
            avatar: editedTaskAvatar ? avatarFileName : task.avatar,
            id: task.id,
            text: taskToEditText
            
        }, taskToEditAvatar)
        setOpenModalEdit(false)
        router.refresh()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setTaskToEditAvatar(file);
            setAvatarFileName(file.name); 
        }
    }

    const handleDeleteTask = async (id: string ) => {
        await deleteTodo(id)
        setOpenModalDeleted(false)
        router.refresh()
    }

    return(
        <tr key={task.id}>
            <td className="flex gap-5">{task.avatar  && <img src={task.avatar} alt="Avatar" />}</td>
            <td className="w-full">{task.text}</td>
            <td className="flex gap-5">
                <FiEdit onClick={ () => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Edit task</h3>
                        <div className="modal-action"></div>
                        <input 
                            value={taskToEditText} 
                            onChange={(e) => setTaskToEditText(e.target.value)} 
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered w-full" 
                        />
                        <input 
                            onChange={handleFileChange} 
                            type="file"  
                            className="input w-full" 
                        />
                        <button type="submit" className="btn">
                            Submit
                        </button>
                    </form>
                </Modal>
                <FiTrash2 onClick={ () => setOpenModalDeleted(true)} cursor="pointer" className="text-red-500" size={25} />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                   <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
                   <div className="modal-action">
                    <button onClick={() => handleDeleteTask(task.id)} className="btn">Yes</button>
                   </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task