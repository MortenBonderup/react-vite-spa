import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import FavouritePage from "./pages/FavouritePage";

function App() {
    return (
        <>
            <Nav />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/favourite" element={<FavouritePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
