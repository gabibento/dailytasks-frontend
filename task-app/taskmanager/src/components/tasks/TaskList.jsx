import { useState } from "react";
import api from "../../services/api";
import dayjs from "dayjs";
import { Box, CircularProgress, Typography } from "@mui/material";
import TaskFilters from "./TaskFilters";
import TaskSection from "./TaskSection";
import ErrorMessage from "../ui/ErrorMessage";
import TaskForm from "./TaskForm";

function TaskList({ tasks, setTasks, setAllTasks, loading, error }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <ErrorMessage error={error} />;

  const toggleTaskCompleted = async (taskId) => {
    try {
      await api.patch(`/tasks/${taskId}`);
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
      await api.delete(`/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };

  const getPriorityColor = (priorityName) => {
    switch (priorityName.toLowerCase()) {
      case "high":
        return "#ff6659";
      case "medium":
        return "#ffb74d";
      case "low":
        return "#fdd835";
      default:
        return "primary";
    }
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        return (
          (filterCategory === "" || task.categoryName === filterCategory) &&
          (filterPriority === "" ||
            task.priorityName.toLowerCase() === filterPriority.toLowerCase()) &&
          (filterStatus === "" ||
            (filterStatus === "completed" ? task.completed : !task.completed))
        );
      })
    : [];

  const today = dayjs().startOf("day");
  const overdueTasks = filteredTasks.filter((task) =>
    dayjs(task.date).isBefore(today)
  );
  const todayTasks = filteredTasks.filter((task) =>
    dayjs(task.date).isSame(today, "day")
  );
  const upcomingTasks = filteredTasks.filter((task) =>
    dayjs(task.date).isAfter(today)
  );

  return (
    <div>
      <Typography
        variant="h4"
        color="primary"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "30px",
          marginTop: "10px",
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem", lg: "2.5rem" },
          textTransform: "uppercase",
        }}
      >
        To Do List
      </Typography>

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
          emptyMessage="No overdue tasks."
          toggleTaskCompleted={toggleTaskCompleted}
          deleteById={deleteById}
          getPriorityColor={getPriorityColor}
          handleEdit={handleEdit}
        />
        <TaskSection
          title="Today"
          tasks={todayTasks}
          emptyMessage="No tasks for today."
          toggleTaskCompleted={toggleTaskCompleted}
          deleteById={deleteById}
          getPriorityColor={getPriorityColor}
          handleEdit={handleEdit}
        />
        <TaskSection
          title="Upcoming"
          tasks={upcomingTasks}
          emptyMessage="No upcoming tasks."
          toggleTaskCompleted={toggleTaskCompleted}
          deleteById={deleteById}
          getPriorityColor={getPriorityColor}
          handleEdit={handleEdit}
        />
      </Box>

      <TaskForm
        open={openTaskForm}
        setOpen={setOpenTaskForm}
        setAllTasks={setAllTasks}
        taskToEdit={taskToEdit}
        setTasks={setTasks}
      />
    </div>
  );
}

export default TaskList;
