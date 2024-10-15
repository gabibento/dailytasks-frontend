import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import dayjs from 'dayjs'; 

const TaskItem = ({ task, toggleTaskCompleted, deleteById, getPriorityColor, handleEdit }) => {
   
    return(
    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ height: "13vh" }}>
    
        <Checkbox checked={task.completed} onChange={() => toggleTaskCompleted(task.id)} />

        <Box sx={{ flexGrow: 1, marginLeft: 2 }}>

        <Typography variant="subtitle1" sx={{ marginBottom: 2.5 }}>
            {task.title}
        </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center">

                <Box display="flex" gap={2}>
                    <Typography variant="body2">{dayjs(task.date).format('DD/MM/YYYY')}</Typography>
                    <Typography variant="body2">{task.categoryName}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton color="grey" onClick={() => handleEdit(task)} sx={{ padding: 0 }}>
                        <EditIcon /> 
                    </IconButton>
                    <IconButton color="grey" onClick={() => deleteById(task.id)} sx={{ padding: 0 }}>
                        <DeleteIcon />
                    </IconButton>
                    <FlagIcon sx={{ color: getPriorityColor(task.priorityName) }} />
                </Box>

            </Box>
        </Box>
    </Box>
   )
}
export default TaskItem;
