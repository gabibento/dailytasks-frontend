import React from 'react'
import { Input, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({tasks, setTasks, allTasks}) => {

  const handleChange = (e) => {
    const value = e.target.value;

    if(value == ''){
      setTasks(allTasks)
    }else{
      setTasks(allTasks.filter((task) => task.title.toLowerCase().includes(value.toLowerCase())));
    }
    
  }
  return (
    <div>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChange} 
        />
    </div>
  )
}

export default Search