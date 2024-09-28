import { useState } from 'react';
import Search from './Search'
import Filter from './Filter'
import { useFetchTasks } from '../hooks/useFetchTasks'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskForm from './TaskForm';

const HeaderBar = () => {
    const {tasks, setTasks, allTasks} = useFetchTasks()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
   
  return (
    <header>
        <Search tasks={tasks} setTasks={setTasks} allTasks={allTasks}></Search>
        <button onClick={handleClickOpen}><AddCircleIcon></AddCircleIcon></button>
        <Filter setTasks={setTasks} allTasks={allTasks}></Filter>
        <TaskForm setOpen={setOpen} open={open}></TaskForm>
    </header>
  )
}

export default HeaderBar