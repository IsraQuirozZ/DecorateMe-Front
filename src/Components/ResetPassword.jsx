import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../Context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import Load from "./Load";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const [ableToReset, setAbleToReset] = useState(false);
  const [load, setLoad] = useState(true);

  const { resetPassword, confirmNewPassword } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        await resetPassword(token);
        setAbleToReset(true);
      } catch (error) {
        let title;
        error.response.data.status === 401
          ? (title = "Ups!")
          : (title = "Error");

        Swal.fire({
          title,
          icon: "warning",
          text: error.response.data.error,
          confirmButtonText: "New Link",
        }).then((res) => {
          if (res.isConfirmed) navigate("/forgot-password");
        });
      } finally {
        setLoad(false);
      }
    })();
  }, [token]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await confirmNewPassword({ ...formData, token });
      Swal.fire("", "Password reset successfully", "success").then(
        (res) => res.isConfirmed && navigate("/")
      );
    } catch (error) {
      if (error.response.status === 400) {
        return Swal.fire({
          title: "Error",
          icon: "warning",
          text: error.response.data.error,
        });
      }
      Swal.fire("Error", error.response.data.error, "error").then((res) => {
        if (res.isConfirmed) navigate("/forgot-password");
      });
    }
  };

  return load ? (
    <Load />
  ) : (
    ableToReset && (
      <>
        <Typography
          sx={{
            margin: 1,
            textAlign: "center",
          }}
          variant="h4"
        >
          Reset password
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "25ch",
            gap: 1,
            m: "auto",
          }}
        >
          <FormControl
            sx={{ marginRight: 1, width: "25ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              onChange={changeHandler}
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl
            sx={{ marginRight: 1, width: "25ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm password
            </InputLabel>
            <OutlinedInput
              onChange={changeHandler}
              name="confirmPassword"
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setshowConfirmPassword(!showPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm password"
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Reset
          </Button>
        </Box>
      </>
    )
  );
};

export default ResetPassword;
