import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import ProgressBar from "./components/progressBar/ProgressBar";

const HomePage = lazy(() => import("./pages/home/HomePage"));

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<ProgressBar />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
