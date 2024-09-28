import axios from 'axios';
import React, { useState } from 'react';
import { useFetchCategoriesPriorities } from '../hooks/useFetchCategoriesPriorities';
import Dialog from '@mui/material/Dialog';

const TaskForm = ({open, setOpen}) => {
    const [task, setTask] = useState({
        title: '',
        completed: false,
        categoryId: '',
        priorityId: '',
        date: '',
      });
    
      const { categories, priorities, loading, error } = useFetchCategoriesPriorities();

      if (loading) return <p>Carregando...</p>;
      if (error) return <p>Erro ao carregar dados.</p>;

      const handleClose = () => {
        setOpen(false)
      }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const formattedDate = new Date(task.date).toLocaleDateString('pt-BR'); 
        const taskToSend = { ...task, date: formattedDate };

        try {
            const response = await axios.post('http://localhost:8080/tasks', taskToSend)

            if (response.status !== 200 && response.status !== 201) {
                throw new Error("Failed to save task");
            }
          console.log("Task saved successfully")
          handleClose()
  
          } catch (error) {
              console.error("Error:", error);
          }
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask({
            ...task, [name]: value
        })
        console.log(value)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
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
            <button onClick={handleClose}>cancel</button>
        </form>
        </Dialog>
    );
};

export default TaskForm;