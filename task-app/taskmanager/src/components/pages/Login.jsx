import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Box, TextField, Button, Typography, Link } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      const token = response.data;
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
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
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
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
