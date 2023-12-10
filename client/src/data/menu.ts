import { Dashboard, PersonRounded } from "@mui/icons-material";

export const navbarMenu = [
	{
		title: "Dashboard",
		icon: Dashboard,
		route: "/dashboard",
		protected: false,
	},
	{
		title: "Settings",
		icon: PersonRounded,
		route: "/dashboard/settings",
		protected: false,
	},
];
