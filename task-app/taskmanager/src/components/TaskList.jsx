import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import Filter from "./Filter";
import { useFetchTasks } from "../hooks/useFetchTasks";

function TaskList() {
  const {tasks, setTasks, allTasks, loading, error} = useFetchTasks()

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
              <p>{task.date}</p>
              <p>{task.categoryName}</p>
              <p>{task.priorityName}</p>
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