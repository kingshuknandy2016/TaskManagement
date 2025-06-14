import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      //Make the API call. As of now we are using mock data.
      setTimeout(() => {
        if (
          formData.email === "admin@gmail.com" &&
          formData.password === "adminpassword"
        ) {
          login("1234567890", {
            id: "1",
            name: formData.email.split("@")[0],
            email: formData.email,
          });
          navigate("/dashboard");
        } else {
          setError("Invalid credentials");
        }
      }, 1000);
    } catch (error: unknown) {
      console.error("Login error:", error);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // nice login form  in mui with tailwind login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 font-serif">
      <Paper
        elevation={3}
        className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg"
      >
        <Typography
          variant="h4"
          component="h1"
          className="text-center font-bold text-gray-900 dark:text-white mb-6"
        >
          Welcome Back
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            variant="outlined"
            className="bg-white dark:bg-gray-700"
            error={!!error}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            variant="outlined"
            className="bg-white dark:bg-gray-700"
            error={!!error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography color="error" className="text-sm">
              {error}
            </Typography>
          )}

          <Box className="flex items-center justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Remember me"
              className="text-gray-600 dark:text-gray-300"
            />
            <Typography
              variant="body2"
              className="text-blue-600 hover:text-blue-800 cursor-pointer dark:text-blue-400"
            >
              Forgot password?
            </Typography>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <Typography
            variant="body2"
            className="text-center mt-4 text-gray-600 dark:text-gray-300"
          >
            Don't have an account?{" "}
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer dark:text-blue-400">
              Sign up
            </span>
          </Typography>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
