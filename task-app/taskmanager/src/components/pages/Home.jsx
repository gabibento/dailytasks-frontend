import React from 'react'
import TaskList from '../tasks/TaskList'
import HeaderBar from '../ui/HeaderBar'
import { useFetchTasks } from '../../hooks/useFetchTasks'

const Home = () => {

  const {tasks, setTasks, allTasks, setAllTasks, loading, error} = useFetchTasks()

  return (
    <div>
        <HeaderBar tasks={tasks} setTasks={setTasks} allTasks={allTasks} setAllTasks={setAllTasks}></HeaderBar>
        <TaskList tasks={tasks} setTasks={setTasks} setAllTasks={setAllTasks} loading={loading} error={error}></TaskList>
    </div>
  )
}

export default Home