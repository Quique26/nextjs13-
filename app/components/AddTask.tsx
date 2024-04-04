"use client"

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4} from "uuid";

const AddTask = () => {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const[newTaskValueText, setNewTaskValueText] = useState<string>("")
    const[newTaskValueAvatar, setNewTaskValueAvatar] = useState<string>("")
    

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const avatarName = newTaskValueAvatar ? newTaskValueAvatar.split('\\').pop() ?? '' : '';

        await addTodo({
            avatar: avatarName,
            id: uuidv4(),
            text: newTaskValueText
            
        })
        setNewTaskValueText("")
        setNewTaskValueAvatar("")
        setModalOpen(false)
        router.refresh()
    }

    return( 
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
                Add new task <AiOutlinePlus className="ml-2" size={18}/>
            </button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewTodo}>
                    <h3 className="font-bold text-lg">Add new task</h3>
                    <div className="modal-action"></div>
                    <input 
                        value={newTaskValueText} 
                        onChange={(e) => setNewTaskValueText(e.target.value)} 
                        type="text" 
                        placeholder="Type here" 
                        className="input input-bordered w-full" 
                    />
                    <input 
                        value={newTaskValueAvatar} 
                        onChange={(e) => setNewTaskValueAvatar(e.target.value)} 
                        type="file"  
                        className="input w-full" 
                    />
                    <button type="submit" className="btn">
                        Submit
                    </button>
                </form>
            </Modal>
        </div>
        
    );
};

export default AddTask;
