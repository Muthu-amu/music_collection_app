import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Overview = lazy(() => import("../pages/Overview"));
const AlbumDetails = lazy(() => import("../pages/AlbumDetails"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/album/:id" element={<AlbumDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;