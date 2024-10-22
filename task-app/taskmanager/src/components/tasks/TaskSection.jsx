import { Typography } from "@mui/material";
import TaskItem from "./TaskItem";

const TaskSection = ({ title, tasks, color, emptyMessage, toggleTaskCompleted, deleteById, getPriorityColor, handleEdit }) => (
  <div style={{ width: "90%", maxWidth: "900px", margin: "30px auto" }}>
    <Typography variant="h6" sx={{ color: color, fontWeight: "bold" }}>
      {title}
    </Typography>
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <li key={task.id} style={taskStyle} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            <TaskItem  
              key={task.id} 
              task={task} 
              toggleTaskCompleted={toggleTaskCompleted} 
              deleteById={deleteById} 
              getPriorityColor={getPriorityColor}
              handleEdit={handleEdit}
            />
          </li>
        ))
      ) : (
        <Typography variant="body1" sx={emptyTaskStyle}>{emptyMessage}</Typography>
      )}
    </ul>
  </div>
);

const taskStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  marginBottom: "30px",
};

const onMouseOver = (e) => {
  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
};

const onMouseOut = (e) => {
  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
};

const emptyTaskStyle = {
  textAlign: "center",
  color: "#999",
  fontSize: "16px",
  margin: "10px 0",
};

export default TaskSection;
