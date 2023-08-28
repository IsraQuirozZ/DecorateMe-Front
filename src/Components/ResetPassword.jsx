import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material"
import { useContext, useState } from "react"
import Swal from "sweetalert2"
import { UserContext } from "../Context/UserContext"

const ResetPassword = () => {

	const { resetPassword } = useContext(UserContext)

	const [showPassword, setShowPassword] = useState(false)
	const [showRepeatedPassword, setShowRepeatedPassword] = useState(false)

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

	const submitHandler = (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			return Swal.fire({
				icon: 'error',
				text: 'Passwords mismatch'
			})
		}
		resetPassword(formData.password, formData.confirmPassword)
		console.log(formData)
	}

	return (
		<>
			<Typography sx={{
				margin: 1,
				textAlign: 'center'
			}} variant="h4">Reset password</Typography>
			<Box component='form' onSubmit={submitHandler} sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '25ch',
				gap: 1,
				m: 'auto',
			}}>
				<FormControl sx={{ marginRight: 1, width: '25ch' }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
					<OutlinedInput
						onChange={changeHandler}
						name="password"
						id="password"
						type={showPassword ? 'text' : 'password'}
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
				<FormControl sx={{ marginRight: 1, width: '25ch' }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
					<OutlinedInput
						onChange={changeHandler}
						name="confirmPassword"
						id="confirmPassword"
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowRepeatedPassword(!showPassword)}
									edge="end"
								>
									{showRepeatedPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Confirm password"
					/>
				</FormControl>
				<Button type="submit" variant="contained">Reset</Button>
			</Box>
		</>
	)
}

export default ResetPassword