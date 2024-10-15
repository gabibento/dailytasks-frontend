import axios from 'axios';
import React, { useState } from 'react';
import { useFetchCategoriesPriorities } from '../hooks/useFetchCategoriesPriorities';
import { Dialog, Box, Button, TextField, MenuItem, FormControl, InputLabel, Select, Typography } from '@mui/material';
import dayjs from 'dayjs'; // Importando dayjs para manipulação de datas

const TaskForm = ({ open, setOpen, setTasks }) => {
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
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Formatando a data corretamente usando dayjs
    const formattedDate = dayjs(task.date).format('YYYY-MM-DD'); 
    const taskToSend = { ...task, date: formattedDate };

    try {
      const response = await axios.post('http://localhost:8080/tasks', taskToSend);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to save task");
      }
      setTasks((prev) => [...prev, response.data]);
      console.log("Task saved successfully");
      handleClose();

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="sm"
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          p: 2, 
          height: 'auto', 
          overflowY: 'auto' 
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}> 
          {/* Título do Formulário */}
          <Typography variant="h5" component="h2" align="center" sx={{ mb: 3 }}>
            Create Task
          </Typography>

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 3, 
              p: 3 
            }}
          >
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
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Box>

            {/* Categoria e Prioridade */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
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

              <FormControl fullWidth>
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
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Task
              </Button>
              <Button onClick={handleClose} variant="outlined" color="secondary" fullWidth>
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default TaskForm;
