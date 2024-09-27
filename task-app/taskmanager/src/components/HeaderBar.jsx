import React from 'react'
import Search from './Search'
import Filter from './Filter'
import { useFetchTasks } from '../hooks/useFetchTasks'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const HeaderBar = () => {
    const {tasks, setTasks, allTasks} = useFetchTasks()
   
  return (
    <header>
        <Search tasks={tasks} setTasks={setTasks} allTasks={allTasks}></Search>
        <button><AddCircleIcon></AddCircleIcon></button>
        <Filter setTasks={setTasks} allTasks={allTasks}></Filter>
    </header>
  )
}

export default HeaderBar