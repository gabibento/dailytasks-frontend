import React from 'react'

const Search = ({tasks, setTasks, allTasks}) => {

  const handleChange = (e) => {
    const value = e.target.value;
    if(value == ''){
      setTasks(allTasks)
    }else{
      setTasks(tasks.filter((task) => task.title.toLowerCase().includes(value.toLowerCase())));
    }
    
  }
  return (
    <div>
        <input onChange={handleChange} type="text"/>
    </div>
  )
}

export default Search