import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Box, TextField, Button, Typography, Link } from "@mui/material";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      await api.post("/auth/register", { username, password }); 
      const response = await api.post("/auth/login", { username, password });
      const token = response.data; 
      localStorage.setItem("authToken", token); 
      
      navigate("/");
    } catch (err) {
        if(err.response.status === 400){
            setError("Username already exists.")
        }else{
            setError("An error occurred. Please try again.");
        }
    } finally {
        setLoading(false); 
      }
  };
  return (
      <Box
         sx={{
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           p: 2,
           height: "90vh",
         }}
       >
         <form onSubmit={handleSignup} style={{ width: "100%", maxWidth: "600px" }}>
           <Typography
             variant="h3"
             align="center"
             sx={{ mb: 3, textTransform: "uppercase" }}
             color="primary"
           >
             Signup
           </Typography>
   
           <Box
             sx={{
               display: "flex",
               flexDirection: "column",
               gap: 4,
               p: 3,
             }}
           >
             <TextField
               label="Username"
               value={username}
               name="username"
               onChange={(e) => setUsername(e.target.value)}
               required
               fullWidth
               variant="outlined"
             />
   
             <TextField
               label="Password"
               value={password}
               name="password"
               type="password"
               onChange={(e) => setPassword(e.target.value)}
               required
               fullWidth
               variant="outlined"
             />
   
             <Typography align="center" color="secondary">
               Already have an account?{" "}
               <Link
                 component="button"
                 variant="body1"
                 onClick={() => navigate("/login")}
               >
                 Log In
               </Link>
             </Typography>
   
             <Button
               type="submit"
               variant="contained"
               color="primary"
               sx={{ color: "white", fontSize: "1.1rem" }}
               fullWidth
             >
                {loading ? "Creating..." : "Sign Up"}
             </Button>
             {error && (
               <Typography
                 sx={{
                   color: "error.main",
                   fontSize: "0.9rem",
                   textAlign: "center",
                 }}
               >
                 {error}
               </Typography>
             )}
           </Box>
         </form>
       </Box>
  );
};

export default Signup;
