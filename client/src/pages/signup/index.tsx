import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import {
	FormGroup,
	TextField,
	InputAdornment,
	IconButton,
	Box,
	Typography,
	Button,
	useTheme,
	Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/PersonRounded";
import EmailIcon from "@mui/icons-material/EmailRounded";
import PasswordIcon from "@mui/icons-material/LockRounded";
import Visible from "@mui/icons-material/Visibility";
import NotVisible from "@mui/icons-material/VisibilityOff";
import FormCard from "../../components/FormCard";
import { useUserContext } from "../../contexts/UserContext";

export default function SignupPage() {
	return (
		<FormCard title="Register Your New Account">
			<Form />
		</FormCard>
	);
}

function Form() {
	const { signup } = useUserContext();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const theme = useTheme();

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const [formError, setFormError] = useState("");

	const handleOnChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormError("");
		setFormData((prevData) => ({
			...prevData,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// TODO: create client validation
		if (formData.password !== formData.confirmPassword) {
			setFormError("Confirm password does not match");
			return;
		}

		setLoading(true);
		const error = await signup?.(
			formData.email,
			formData.password,
			formData.username
		);
		if (error) {
			setFormError((error as any).response.data.message);
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} style={{ padding: "1rem 0 0 0" }}>
			{formError ? (
				<Alert severity="error" sx={{ mb: 2 }}>
					{formError}
				</Alert>
			) : (
				<></>
			)}
			<FormGroup sx={{ gap: 2 }}>
				{/* username */}
				<TextField
					id="username"
					type="text"
					label="Username"
					placeholder="My Username"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<PersonIcon />
							</InputAdornment>
						),
					}}
					autoFocus
					onChange={handleOnChange}
					value={formData.username}
				/>

				{/* email */}
				<TextField
					id="email"
					type="email"
					label="Email"
					placeholder="myemail@gmail.com"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<EmailIcon />
							</InputAdornment>
						),
					}}
					onChange={handleOnChange}
					value={formData.email}
				/>

				{/* password */}
				<TextField
					id="password"
					type={passwordVisible ? "text" : "password"}
					label="Password"
					placeholder="********"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<PasswordIcon />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() => setPasswordVisible(!passwordVisible)}
								>
									{passwordVisible ? (
										<Visible />
									) : (
										<NotVisible sx={{ opacity: "0.5" }} />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
					onChange={handleOnChange}
					value={formData.password}
				/>

				{/* confirm password */}
				<TextField
					id="confirmPassword"
					type="password"
					label="Confirm Password"
					placeholder="********"
					onChange={handleOnChange}
					value={formData.confirmPassword}
				/>

				{/* action button */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Button
						type="submit"
						variant="contained"
						disabled={loading}
						disableElevation
						sx={{ flex: 1 }}
					>
						Register
					</Button>
				</Box>

				<Box sx={{ height: "1px", background: theme.palette.divider, mt: 2 }} />

				<Link
					to={!loading ? "/signin" : ""}
					style={{ marginInline: "auto" }}
					replace={true}
				>
					<Typography color="primary">Already have Account</Typography>
				</Link>
			</FormGroup>
		</form>
	);
}
