import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import KeyIcon from "@mui/icons-material/Key";
import { useAuth } from "../../context/auth/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
};

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { signup, login, loading } = useAuth();
  console.log(loading);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        await signup(formData);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
        toast.success("Sign up successful");
        setIsSignUp((prev) => !prev);
      } else {
        await login(formData);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
        toast.success("Sign up successful");
        window.location.href = "/";
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignUp((preV) => !preV);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: "#fff",
        padding: 1,
        marginTop: 3,
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: "#ff9d00" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "SIGN UP" : "SIGN IN"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {isSignUp && (
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                {" "}
                <TextField
                  margin="normal"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  size="small"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          )}
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            size="small"
            autoFocus
            autoComplete="off"
            onChange={handleChange}
          />

          {isSignUp && (
            <FormControl sx={{ mt: 1, width: 120 }} size="large">
              <InputLabel id="demo-select-small-label">Role</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="role"
                name="role"
                onChange={handleChange}
                defaultValue=""
              >
                <MenuItem value="mentor">Mentor</MenuItem>
                <MenuItem value="mentee">Mentee</MenuItem>
              </Select>
            </FormControl>
          )}

          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            size="small"
            autoComplete="off"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box mt={2} display={"flex"} flexDirection={"column"} gap={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {isSignUp ? "SIGN UP" : "SIGN IN"} &nbsp;&nbsp;
              <KeyIcon sx={{ color: "#ff9d00" }} />
            </Button>
          </Box>

          <Grid container justifyContent={"center"}>
            {/* <Grid item xs>
              <Typography variant="body2">Forgot password?</Typography>
            </Grid> */}
            <Grid item mt={2}>
              <Button
                onClick={switchMode}
                sx={{
                  transition: "background-color 0.3s ease", // Smooth transition for hover effect
                  "&:hover": {
                    backgroundColor: "#ff9d00", // Background color on hover
                  },
                }}
              >
                {isSignUp ? "SWITCH TO SIGN IN" : "SWITCH TO SIGN UP"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
