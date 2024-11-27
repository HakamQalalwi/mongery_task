
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";

function App() {
    return (<div>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>

    );
}

export default App;
