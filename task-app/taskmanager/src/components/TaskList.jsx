import axios from "axios";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskList({ tasks, setTasks, loading, error }) {
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const toggleTaskCompleted = async (taskId) => {
    try {
      await axios.patch(`http://localhost:8080/tasks/${taskId}`);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Erro ao alternar o status da tarefa:", error);
    }
  };

  const deleteById = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${taskId}`);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };

  const getPriorityColor = (priorityName) => {
    switch (priorityName.toLowerCase()) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "yellow";
      default:
        return "grey";
    }
  };

  return (
    <div>
      <h2>Lista de Tasks</h2>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Adiciona espaço uniforme entre as colunas
                padding: "15px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                transition: "box-shadow 0.2s",
              }}
            >
              {/* Checkbox */}
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskCompleted(task.id)}
                sx={{ flexShrink: 0 }}
              />

              {/* Detalhes da tarefa */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  marginLeft: 2,
                }}
              >
                {/* Título da tarefa */}
                <Typography variant="subtitle1" sx={{ marginBottom: 0.5 }}>
                  {task.title}
                </Typography>

                {/* Data, Categoria e Botão de Deletar */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center", // Alinha todos verticalmente no centro
                    marginTop: 1,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography variant="body2">{task.date}</Typography>
                    <Typography variant="body2">{task.categoryName}</Typography>
                  </Box>

                  <IconButton
                    color="error"
                    onClick={() => deleteById(task.id)}
                    sx={{ padding: 0 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <FlagIcon sx={{ color: getPriorityColor(task.priorityName) }} />
              </Box>

              {/* Ícone de Prioridade */}
            
               
              
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
