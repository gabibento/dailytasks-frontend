import React, { useState, useEffect } from 'react';
import { Dialog, Box, Button, TextField, MenuItem, FormControl, InputLabel, Select, Typography, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import api from '../../services/api';
import { useFetchCategoriesPriorities } from '../../hooks/useFetchCategoriesPriorities';

const TaskForm = ({ open, setOpen, setTasks, setAllTasks, taskToEdit }) => {
  const { categories, priorities, loading, error } = useFetchCategoriesPriorities();
  const [task, setTask] = useState({
    title: '',
    completed: false,
    categoryId: '',
    priorityId: '',
    date: '',
  });
  const [submitting, setSubmitting] = useState(false); // Estado para controlar o carregamento durante o envio

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        completed: taskToEdit.completed,
        categoryId: taskToEdit.categoryId,
        priorityId: taskToEdit.priorityId,
        date: dayjs(taskToEdit.date).format('YYYY-MM-DD'),
      });
    }
  }, [taskToEdit]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); 

    const formattedDate = dayjs(task.date).format('YYYY-MM-DD');
    const taskToSend = { ...task, date: formattedDate };

    try {
      let response;
      if (taskToEdit) {
        response = await api.put(`/tasks/${taskToEdit.id}`, taskToSend);
      } else {
        response = await api.post('/tasks', taskToSend);
      }

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to save task");
      }

      setTasks((prev) =>
        taskToEdit
          ? prev.map((t) => (t.id === taskToEdit.id ? response.data : t))
          : [...prev, response.data]
      );

      setAllTasks((prev) =>
        taskToEdit
          ? prev.map((t) => (t.id === taskToEdit.id ? response.data : t))
          : [...prev, response.data]
      );

      console.log("Task saved successfully");
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  if (loading || submitting) { 
    return (
      <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        zIndex: 9999,
      }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 2 }}>
          <Typography variant="h6" color="error">
            Error loading categories and priorities
          </Typography>
        </Box>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, height: 'auto', overflowY: 'auto' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
          <Typography variant="h5" component="h2" align="center" sx={{ mb: 3, textTransform: "uppercase" }} color="primary">
            {taskToEdit ? "Edit Task" : "New Task"}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
            {/* Título e Data */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Title"
                value={task.title}
                name="title"
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Date"
                type="date"
                value={task.date}
                name="date"
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Box>

            {/* Categoria e Prioridade */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={task.categoryId}
                  name="categoryId"
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>Select a category</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={task.priorityId}
                  name="priorityId"
                  onChange={handleChange}
                  label="Priority"
                >
                  <MenuItem value="">
                    <em>Select a priority</em>
                  </MenuItem>
                  {priorities.map((priority) => (
                    <MenuItem key={priority.id} value={priority.id}>
                      {priority.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Botões */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Button onClick={handleClose} variant="outlined" color="primary" fullWidth>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" sx={{ color: "white" }} fullWidth>
                {submitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Add Task"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default TaskForm;
