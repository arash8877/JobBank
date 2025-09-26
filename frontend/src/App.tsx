import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app light";

  return (
    <div className="appStyle">
      <Navbar />
      <div className="wrapper">Routes</div>
    </div>
  );
};

export default App;
