import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Box, CircularProgress, Typography } from "@mui/material";
import TaskFilters from "./TaskFilters";
import TaskSection from "./TaskSection";
import ErrorMessage from "./ErrorMessage";
import TaskForm from "./TaskForm";

function TaskList({ tasks, setTasks, loading, error }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  if (loading) return <Box display="flex" justifyContent="center" minHeight="400px"><CircularProgress /></Box>;

  if (error) return <ErrorMessage error={error} />;

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
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };

  const getPriorityColor = (priorityName) => {
    switch (priorityName.toLowerCase()) {
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "yellow";
      default: return "grey";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filterCategory === "" || task.categoryName === filterCategory) &&
      (filterPriority === "" || task.priorityName.toLowerCase() === filterPriority.toLowerCase()) &&
      (filterStatus === "" || (filterStatus === "completed" ? task.completed : !task.completed))
    );
  });

  const today = dayjs().startOf('day');  
  const overdueTasks = filteredTasks.filter(task => dayjs(task.date).isBefore(today));
  const todayTasks = filteredTasks.filter(task => dayjs(task.date).isSame(today, 'day'));
  const upcomingTasks = filteredTasks.filter(task => dayjs(task.date).isAfter(today));

  return (
    <div>
      <TaskFilters
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <Box>
        <TaskSection 
          title="Overdue" 
          tasks={overdueTasks} 
          color="#f44336" 
          emptyMessage="No overdue tasks."
          toggleTaskCompleted={toggleTaskCompleted}
          deleteById={deleteById}
          getPriorityColor={getPriorityColor}
          handleEdit={handleEdit}
        />
        <TaskSection 
          title="Today" 
          tasks={todayTasks} 
          color="#4caf50" 
          emptyMessage="No tasks for today."
          toggleTaskCompleted={toggleTaskCompleted}
          deleteById={deleteById}
          getPriorityColor={getPriorityColor}
          handleEdit={handleEdit}
        />
        <TaskSection 
          title="Upcoming" 
          tasks={upcomingTasks} 
          color="#2196f3" 
          emptyMessage="No upcoming tasks."
          toggleTaskCompleted={toggleTaskCompleted}
          deleteById={deleteById}
          getPriorityColor={getPriorityColor}
          handleEdit={handleEdit}
        />
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

export default TaskList;
