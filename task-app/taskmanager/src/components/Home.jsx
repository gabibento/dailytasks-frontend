import React from 'react'
import TaskList from './TaskList'
import HeaderBar from './HeaderBar'
import { useFetchTasks } from '../hooks/useFetchTasks'

const Home = () => {

  const {tasks, setTasks, allTasks, loading, error} = useFetchTasks()

  return (
    <div>
        <HeaderBar tasks={tasks} setTasks={setTasks} allTasks={allTasks}></HeaderBar>
        <TaskList tasks={tasks} setTasks={setTasks} loading={loading} error={error}></TaskList>
    </div>
  )
}

export default Home