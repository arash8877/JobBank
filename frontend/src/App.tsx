import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyle = darkMode ? "app dark" : "app light";

  return (
    <div className="appStyle">
      <h1>Navbar</h1>
      <div className="wrapper">Routes</div>
    </div>
  );
};

export default App;
