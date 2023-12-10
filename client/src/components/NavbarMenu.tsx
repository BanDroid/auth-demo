import { MouseEvent, useState } from "react";
import { Link, Location, useLocation } from "react-router-dom";
import { useUserContext, UserContextType } from "../contexts/UserContext";
import {
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Theme,
	Typography,
	useTheme,
	Tabs,
	Tab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuRounded";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import { navbarMenu } from "../data/menu";

interface MenuProps {
	theme?: Theme;
	location?: Location<any>;
	userContext?: UserContextType;
}

export default function NavbarMenu() {
	const theme = useTheme();
	const location = useLocation();
	const userContext = useUserContext();
	return (
		<>
			<DesktopMenu
				theme={theme}
				location={location}
				userContext={userContext}
			/>
			<MobileMenu theme={theme} location={location} userContext={userContext} />
		</>
	);
}

interface LinkTabProps {
	label?: string;
	href?: string;
}

function LinkTab(props: LinkTabProps) {
	return (
		<Tab
			LinkComponent={Link}
			{...{ to: props.href, replace: true }}
			{...props}
		/>
	);
}

function DesktopMenu({ theme, location, userContext }: MenuProps) {
	// const [value, setValue] = useState(0);

	return (
		<Box
			sx={{
				width: "60%",
				display: {
					xs: "none",
					md: "flex",
				},
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Tabs
				value={navbarMenu.findIndex(
					(item) => location?.pathname === item.route
				)}
				aria-label="desktop nav tabs"
				sx={{
					"& .MuiTabs-indicator": {
						display: "none",
					},
				}}
			>
				{navbarMenu.map((item) => (
					<LinkTab key={item.title} label={item.title} href={item.route} />
				))}
			</Tabs>
			<Button
				LinkComponent={Link}
				variant="contained"
				color="error"
				disableElevation
				startIcon={<LogoutIcon />}
				onClick={() => userContext?.signout?.()}
			>
				Logout
			</Button>
		</Box>
	);
}

function MobileMenu({ theme, location, userContext }: MenuProps) {
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

	const handleAnchorEl = (e: MouseEvent<HTMLButtonElement>) => {
		setMenuAnchorEl((currentValue) =>
			Boolean(currentValue) ? null : e.currentTarget
		);
	};

	return (
		<Box
			sx={{
				display: {
					xs: "block",
					md: "none",
				},
			}}
		>
			<IconButton color="inherit" onClick={handleAnchorEl}>
				<MenuIcon />
			</IconButton>

			<Menu
				open={Boolean(menuAnchorEl)}
				transformOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				anchorEl={menuAnchorEl}
				onClose={() => setMenuAnchorEl(null)}
				keepMounted
				elevation={2}
			>
				{navbarMenu.map((item, index) => (
					<MenuItem
						key={index}
						onClick={() => setMenuAnchorEl(null)}
						divider={index === navbarMenu.length - 1 ? true : false}
						selected={location?.pathname === item.route}
						dense
						disableGutters
					>
						<Link
							to={item.route}
							style={{
								fontSize: "1rem",
								width: "100%",
								height: "100%",
								padding: "0.5rem 1rem",
								display: "flex",
								alignItems: "center",
							}}
						>
							<item.icon sx={{ mr: 2 }} fontSize="small" />
							{item.title}
						</Link>
					</MenuItem>
				))}
				<MenuItem
					onClick={() => {
						setMenuAnchorEl(null);
						userContext?.signout?.();
					}}
				>
					<LogoutIcon sx={{ mr: 2 }} fontSize="small" color="error" />
					<Typography>Sign Out</Typography>
				</MenuItem>
			</Menu>
		</Box>
	);
}
