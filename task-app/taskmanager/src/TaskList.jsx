import React, { useState, useEffect } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8080/tasks", {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar tasks");
        }

        const data = await response.json(); 
        setTasks(data); 
        setLoading(false); 
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTasks(); 
  }, []); 

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;


  return (
    <div>
      <h2>Lista de Tasks</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
             <input type="radio" checked={task.completed} readOnly/>
              <strong>{task.title}:</strong> 
            
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
