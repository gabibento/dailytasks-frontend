import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tasks");
        setTasks(response.data);
        setLoading(false); 
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTasks(); 
  }, [tasks]); 

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const toggleTaskCompleted = async (taskId) => {
    try{
        await axios.patch(`http://localhost:8080/tasks/${taskId}`);

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          )
    }catch (error) {
      console.error("Erro ao alternar o status da tarefa:", error);
    }
  }
  const deleteById = async (taskId) => {
    try{
        await axios.delete(`http://localhost:8080/tasks/${taskId}`)
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id != taskId)
        );
    }catch (error) {
        console.error("Erro ao deletar a tarefa:", error);
    }
  }


  return (
    <div>
      <h2>Lista de Tasks</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
             <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompleted(task.id)}/>
              <strong>{task.title}</strong> 
              <p>{task.categoryName}</p>
              <button onClick={() => deleteById(task.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>Nenhuma task encontrada.</p>
        )}
      </ul>
    </div>
  );
}

export default TaskList;
