import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material"
import ReturnButton from "./ReturnButton"
import { useContext, useState } from "react"
import { UserContext } from "../Context/UserContext"
import Swal from "sweetalert2"

const ForgotPassword = () => {

	const { forgotPassword } = useContext(UserContext)

	const [load, setLoad] = useState(false)

	const submitHandler = async e => {
		e.preventDefault();
		if(e.target[0].value) {
			try {
				const res = await forgotPassword(e.target[0].value)
				console.log(res)
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: res.data.response
					
				})
			} catch (error) {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: error.response.data.error
				})
			} finally {
				setLoad(false)
			}
		}
	}

	return (
		<>
			<ReturnButton/>
			<Paper sx={{
				margin: '2rem auto',
				maxWidth: '350px',
				padding: '1.5rem 2rem'
			}}>
				<Box onSubmit={submitHandler} component='form' sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '8px'
				}}>
					<Typography fontSize='2rem' variant='h1'>Find your account</Typography>
					<Divider />
					<Typography sx={{ margin: '6px 0 2px 0'}}>Please enter your email</Typography>
					<TextField type="email" variant="outlined" label="Email" />
					<Button variant="contained" type="submit">{load ? "..." : "Search"}</Button>
				</Box>
			</Paper>
		</>
	)
}

export default ForgotPassword