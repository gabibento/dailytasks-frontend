import React from 'react'
import TaskList from './TaskList'
import HeaderBar from './HeaderBar'

const Home = () => {
  return (
    <div>
        <HeaderBar></HeaderBar>
        <TaskList></TaskList>
    </div>
  )
}

export default Home