import React from 'react'
import { Input, Box, InputAdornment, TextField } from '@mui/material';
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
    <Box sx={{ width: '100%' }}>
        <TextField
         fullWidth
         sx={{
           maxWidth: { xs: '65%', sm: '60%', md: '70%', lg: '70%' },
           '& .MuiInputBase-input': {
            padding: '8px 12px',
            fontSize: { xs: '14px', sm: '16px', md: '18px' }, 
          }
         }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleChange} 
        />
    </Box>
  )
}

export default Search