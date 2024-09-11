import React, { useState, useEffect } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tasks
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para tratar erros

  useEffect(() => {
    // Função para buscar as tasks do backend
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

        const data = await response.json(); // Converte a resposta para JSON
        setTasks(data); // Define o estado com as tasks recebidas
        setLoading(false); // Carregamento concluído
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTasks(); // Chama a função ao montar o componente
  }, []); // O array vazio [] garante que o fetch seja executado apenas uma vez ao montar o componente

  // Renderização condicional para mostrar o carregamento ou erros
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  // Retorna uma lista de tasks
  return (
    <div>
      <h2>Lista de Tasks</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}:</strong> {task.completed}
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
