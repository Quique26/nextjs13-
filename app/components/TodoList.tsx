import { ITask } from "@/types/tasks";

interface TodoListProps{
    tasks: ITask[]
}

const TodoList:React.FC<TodoListProps> = () => {
    return( 
        <div className="overflow-x-auto">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Favorite Color</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Blue</td>
                    </tr>
                </tbody>
                </table>
        </div>
    );
};

export default TodoList;