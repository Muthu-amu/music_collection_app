import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "../pages/Overview";
import AlbumDetailsPage from "../pages/AlbumDetailsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/album/:id" element={<AlbumDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;