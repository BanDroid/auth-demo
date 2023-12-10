import { Routes, Route } from "react-router-dom";
import NotFound from "../404";
import DashboardHome from "./home";
import DashboardProfile from "./profile";

export default function DashboardRoutesHandler() {
	return (
		<Routes>
			<Route path="/" element={<DashboardHome />} />
			<Route path="/settings" element={<DashboardProfile />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
