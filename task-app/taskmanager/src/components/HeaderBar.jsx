import { useState } from 'react';
import Search from './Search'
import Filter from './Filter'
import { useFetchTasks } from '../hooks/useFetchTasks'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskForm from './TaskForm';
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
          m: 2,
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Search tasks={tasks} setTasks={setTasks} allTasks={allTasks} />
        </Box>

            <IconButton onClick={handleClickOpen}>
                    <AddCircleIcon  sx={{ fontSize: { xs: 30, sm: 40, md: 40 } }}/>
            </IconButton>
                {/* <Filter setTasks={setTasks} allTasks={allTasks}></Filter> */}
            <TaskForm setOpen={setOpen} open={open}></TaskForm>

    </Box>
    </header>
  )
}

export default HeaderBar