import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const TaskFilters = ({ filterCategory, setFilterCategory, filterPriority, setFilterPriority, filterStatus, setFilterStatus }) => {
  return (
    <Box display="flex" justifyContent="center" marginBottom={2} sx={{ gap: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}>

      <FormControl sx={{ minWidth: { xs: "100px", sm: "130px", md: "150px" }, height: "40px" }}>
        <InputLabel sx={{ top: "-6px", textAlign: "center", fontSize: "14px"}}>Category</InputLabel>
        <Select value={filterCategory} 
        onChange={(e) => setFilterCategory(e.target.value)}  
        sx={{ height: "40px", borderRadius: "8px" }} >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Study">Study</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: { xs: "100px", sm: "130px", md: "150px" }, height: "40px" }}>
        <InputLabel sx={{ top: "-6px", textAlign: "center", fontSize: "14px" }}>Priority</InputLabel>
        <Select value={filterPriority} 
        onChange={(e) => setFilterPriority(e.target.value)}  
        sx={{ height: "40px", borderRadius: "8px" }} >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: { xs: "100px", sm: "130px", md: "150px" }, height: "40px" }}>
        <InputLabel sx={{ top: "-6px", textAlign: "center", fontSize: "14px" }}>Status</InputLabel>
        <Select value={filterStatus} 
        onChange={(e) => setFilterStatus(e.target.value)}  
        sx={{ height: "40px", borderRadius: "8px" }} >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </FormControl>
      
    </Box>
  );
};

export default TaskFilters;
