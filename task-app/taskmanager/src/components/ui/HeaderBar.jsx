import { useState } from 'react';
import Search from './Search'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskForm from '../tasks/TaskForm';
import { Box, IconButton } from '@mui/material';

const HeaderBar = ({ tasks, setTasks, allTasks}) => {
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
   
  return (
    <header>
       <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          width: "90%",
          maxWidth: "900px",
          m: "auto",
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Search tasks={tasks} setTasks={setTasks} allTasks={allTasks} />
        </Box>

            <IconButton onClick={handleClickOpen}>
              <AddCircleIcon  sx={{ fontSize: { xs: 30, sm: 40, md: 40 }, color: "#ff8fa0" }}/>
            </IconButton>
  
            <TaskForm setOpen={setOpen} open={open} setTasks={setTasks}></TaskForm>

    </Box>
    </header>
  )
}

export default HeaderBar