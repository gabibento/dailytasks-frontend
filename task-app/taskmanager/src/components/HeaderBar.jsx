import { useState } from 'react';
import Search from './Search'
import Filter from './Filter'
import { useFetchTasks } from '../hooks/useFetchTasks'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskForm from './TaskForm';
import { Box, IconButton } from '@mui/material';

const HeaderBar = () => {
    const {tasks, setTasks, allTasks} = useFetchTasks()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
   
  return (
    <header>
        <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        m: 2 
        }}>
            <Search tasks={tasks} setTasks={setTasks} allTasks={allTasks}></Search>

            <IconButton onClick={handleClickOpen}>
                    <AddCircleIcon sx={{ fontSize: 30 }} />
            </IconButton>
                {/* <Filter setTasks={setTasks} allTasks={allTasks}></Filter> */}
            <TaskForm setOpen={setOpen} open={open}></TaskForm>

    </Box>
    </header>
  )
}

export default HeaderBar