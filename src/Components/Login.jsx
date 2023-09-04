import { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import GoogleIcon from "@mui/icons-material/Google";
// import "./Login.css";
import {
  Typography,
  Button,
  TextField,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { UserContext } from "../Context/UserContext";
import GoogleWidget from "./GoogleWidget";

const Login = () => {
  const { login, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState({
    email: true,
    password: true,
  });

  let [message, setMessage] = useState("");

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(formData)
      .then(async (res) => {
        console.log(res.data.response.user);
        await setUser(res.data.response.user);
        setFormData({
          email: "",
          password: "",
        });
        setValidation({
          email: true,
          password: true,
        });
        // window.location.href = "/";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("pasa en 400");
          console.log(err);
          setMessage(err.response.data.error);
        } else if (err.response.status === 401) {
          console.log("pasa en 401");
          setMessage(err.response.data.error);
        }
      });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => submitHandler(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            error={!validation.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={changeHandler}
          />
          <TextField
            error={!validation.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changeHandler}
          />
          <Typography sx={{ color: "red" }}>{message}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid item xs>
            <Link to="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
          <GoogleWidget />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
