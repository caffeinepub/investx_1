import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import FundDetailPage from "./pages/FundDetailPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MarketsPage from "./pages/MarketsPage";
import StockDetailPage from "./pages/StockDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/markets" element={<MarketsPage />} />
                <Route path="/stock/:id" element={<StockDetailPage />} />
                <Route path="/fund/:id" element={<FundDetailPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
