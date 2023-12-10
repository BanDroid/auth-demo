import { BrowserRouter } from "react-router-dom";
import RoutesHandler from "./pages/handler";
import UserContextProvider from "./contexts/UserContext";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
	return (
		<BrowserRouter basename={import.meta.env.VITE_BASENAME || "/"}>
			<UserContextProvider>
				<RoutesHandler />
			</UserContextProvider>
		</BrowserRouter>
	);
}

export default App;
