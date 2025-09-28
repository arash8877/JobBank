import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import ProgressBar from "./components/progressBar/ProgressBar";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const CompaniesPage = lazy(() => import("./pages/companies/CompaniesPage"));
const AddCompanyPage = lazy(() => import("./pages/companies/AddCompanyPage"));

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
            <Route path="/companies">
              <Route index element={<CompaniesPage />} />
              <Route path="/companies/add" element={<AddCompanyPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
