import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Box, TextField, Button, Typography, Link } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password }); 
      const token = response.data; 
      localStorage.setItem("authToken", token); 

      navigate("/");
    } catch (err) {
      setError("Username or password invalid");
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
      <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "600px" }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 3, textTransform: "uppercase" }}
          color="primary"
        >
          Login
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
            Don't have an account?{" "}
            <Link
              component="button"
              variant="body1"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Link>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ color: "white", fontSize: "1.1rem" }}
            fullWidth
          >
            Login
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

export default Login;
