import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TaskForm = () => {
    const [task, setTask] = useState({
        title: '',
        completed: false,
        categoryId: '',
        priorityId: '',
        date: '',
      });

      const [categories, setCategories] = useState([])
      const [priorities, setPriorities] = useState([])
    
      useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await axios.get('http://localhost:8080/categories')
                const responsePriority = await axios.get('http://localhost:8080/priorities')
                setCategories(response.data)
                setPriorities(responsePriority.data)
            }catch (e) {
                console.error(e)
            }
        }
        fetchCategories()
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const formattedDate = new Date(task.date).toLocaleDateString('pt-BR'); 
        const taskToSend = { ...task, date: formattedDate };

        try {
            const response = await fetch('http://localhost:8080/tasks', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskToSend),
            });
            if (!response.ok) {
                throw new Error("Failed to save task");
            }
            console.log("Task saved successfully");
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask({
            ...task, [name]: value
        })
        console.log(value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                    <input
                        type="text"
                        value={task.title}
                        name='title'
                        onChange={handleChange}
                        required
                    />
                <label>Date:</label>
                <input 
                type="date"
                value={task.date}
                name='date'
                onChange={handleChange}
                />

                <label>Category:</label>

               <select name='categoryId' value={task.categoryId} onChange={handleChange}>
                <option value="">Select a category</option>

                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
               </select>

               
               <label>Priority:</label>

                <select name='priorityId' value={task.priorityId} onChange={handleChange}>
                  <option value="">Select a Priority</option>
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.id}>{priority.name}</option>
                ))}
               </select>

            </div>
           
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
