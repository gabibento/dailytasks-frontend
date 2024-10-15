import axios from "axios";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { useState } from "react";
import dayjs from "dayjs";  

function TaskList({ tasks, setTasks, loading, error }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [openTaskForm, setOpenTaskForm] = useState(false); 
  const [taskToEdit, setTaskToEdit] = useState(null);

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
  const handleEdit = (task) => {
    setTaskToEdit(task); 
    setOpenTaskForm(true); 
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

  const filteredTasks = tasks.filter((task) => {
    return (
      (filterCategory === "" || task.categoryName === filterCategory) &&
      (filterPriority === "" || task.priorityName.toLowerCase() === filterPriority.toLowerCase()) &&
      (filterStatus === "" || (filterStatus === "completed" && task.completed) || (filterStatus === "pending" && !task.completed))
    );
  });

  const today = dayjs().startOf('day');  
  const overdueTasks = filteredTasks.filter(task => dayjs(task.date).isBefore(today));
  const todayTasks = filteredTasks.filter(task => dayjs(task.date).isSame(today, 'day'));
  const upcomingTasks = filteredTasks.filter(task => dayjs(task.date).isAfter(today));

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#7f9cf5", 
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem", lg: "2.5rem" },
          textTransform: "uppercase",
        }}
      >
        To Do List
      </Typography>

      {/* Filtros */}
      <Box display="flex" justifyContent="center" marginBottom={2} sx={{ gap: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}>
        {/* Filtrar por categoria */}
        <FormControl
          sx={{
            minWidth: { xs: "100px", sm: "130px", md: "150px" }, 
            borderRadius: "8px",
            height: "40px",
          }}
        >
          <InputLabel sx={{ top: "-6px", textAlign: "center", fontSize: "14px" }}>Category</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            sx={{ height: "40px", borderRadius: "8px" }} 
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Study">Study</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
          </Select>
        </FormControl>

        {/* Filtrar por prioridade */}
        <FormControl
          sx={{
            minWidth: { xs: "100px", sm: "130px", md: "150px" }, 
            borderRadius: "8px",
            height: "40px",
          }}
        >
          <InputLabel sx={{ top: "-6px", textAlign: "center", fontSize: "14px" }}>Priority</InputLabel>
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            sx={{ height: "40px", borderRadius: "8px" }} 
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>

        {/* Filtrar por status */}
        <FormControl
          sx={{
            minWidth: { xs: "100px", sm: "130px", md: "150px" },
            borderRadius: "8px",
            height: "40px",
          }}
        >
          <InputLabel sx={{ top: "-6px", textAlign: "center", fontSize: "14px" }}>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ height: "40px", borderRadius: "8px" }} 
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Seções de tarefas */}
      <Box>
        {/* Seção Overdue */}
        <Typography variant="h6" sx={{ marginBottom: "10px", color: "#ff6f61", fontWeight: "bold", textAlign: "center" }}>
          Overdue
        </Typography>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {overdueTasks.length > 0 ? (
            overdueTasks.map((task) => (
              <li key={task.id} style={taskStyle} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                <TaskItem  
                  key={task.id} 
                  task={task} 
                  toggleTaskCompleted={toggleTaskCompleted} 
                  deleteById={deleteById} 
                  getPriorityColor={getPriorityColor}
                  handleEdit={handleEdit}
                />
              </li>
            ))
          ) : (
            <Typography variant="body1" sx={emptyTaskStyle}>No overdue tasks.</Typography>
          )}
        </ul>

        {/* Seção Today */}
        <Typography variant="h6" sx={{ marginBottom: "10px", color: "#4caf50", fontWeight: "bold", textAlign: "center" }}>
          Today
        </Typography>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {todayTasks.length > 0 ? (
            todayTasks.map((task) => (
              <li key={task.id} style={taskStyle} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                <TaskItem  
                  key={task.id} 
                  task={task} 
                  toggleTaskCompleted={toggleTaskCompleted} 
                  deleteById={deleteById} 
                  getPriorityColor={getPriorityColor}
                  handleEdit={handleEdit}
                />
              </li>
            ))
          ) : (
            <Typography variant="body1" sx={emptyTaskStyle}>No tasks for today.</Typography>
          )}
        </ul>

        {/* Seção Upcoming */}
        <Typography variant="h6" sx={{ marginBottom: "10px", color: "#2196f3", fontWeight: "bold", textAlign: "center" }}>
          Upcoming
        </Typography>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <li key={task.id} style={taskStyle} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                <TaskItem  
                  key={task.id} 
                  task={task} 
                  toggleTaskCompleted={toggleTaskCompleted} 
                  deleteById={deleteById} 
                  getPriorityColor={getPriorityColor}
                  handleEdit={handleEdit}
                />
              </li>
            ))
          ) : (
            <Typography variant="body1" sx={emptyTaskStyle}>No upcoming tasks.</Typography>
          )}
        </ul>
      </Box>
      {openTaskForm && (
        <TaskForm 
          open={openTaskForm} 
          setOpen={setOpenTaskForm} 
          taskToEdit={taskToEdit} 
          setTasks={setTasks}
        />
      )}
    </div>
  );
}

// Estilização para as mensagens de "No tasks"
const emptyTaskStyle = {
  textAlign: "center",
  color: "#999",
  fontSize: "16px",
  margin: "10px 0",
};

const taskStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  width: "90%",
  maxWidth: "900px",
  margin: "30px auto",
};

const onMouseOver = (e) => {
  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
};

const onMouseOut = (e) => {
  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
};

export default TaskList;
