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
import EmailIcon from "@mui/icons-material/EmailRounded";
import PasswordIcon from "@mui/icons-material/LockRounded";
import Visible from "@mui/icons-material/Visibility";
import NotVisible from "@mui/icons-material/VisibilityOff";
import FormCard from "../../components/FormCard";
import { useUserContext } from "../../contexts/UserContext";

export default function SigninPage() {
	return (
		<FormCard title="Welcome Back">
			<Form />
		</FormCard>
	);
}

function Form() {
	const { signin } = useUserContext();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const theme = useTheme();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
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
		setLoading(true);
		const error = await signin?.(formData.email, formData.password);
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
					autoFocus
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

				{/* action button */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Link to={!loading ? "/reset-password" : ""} aria-disabled={loading}>
						<Typography color="error">Forgot password</Typography>
					</Link>

					<Button
						type="submit"
						variant="contained"
						disabled={loading}
						disableElevation
					>
						Sign In
					</Button>
				</Box>

				<Box sx={{ height: "1px", background: theme.palette.divider, mt: 2 }} />

				<Link
					to={!loading ? "/signup" : ""}
					style={{ marginInline: "auto" }}
					replace={true}
				>
					<Typography color="primary">Create a New Account</Typography>
				</Link>
			</FormGroup>
		</form>
	);
}
