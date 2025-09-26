import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { Menu, LightMode, DarkMode, Close } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";

const links = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/jobs", label: "Jobs" },
  { href: "/applicants", label: "Applicants" },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const ToggleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const menuStyles = open ? "menu open" : "menu";

  return (
    <div className="navbar">
      <div className="brand">
        <span>JobBank</span>
      </div>
      <div className={menuStyles}>
        <ul>
          {links.map((item) => (
            <li key={item.href} onClick={ToggleOpenMenu}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
        <div className="hamburger" onClick={ToggleOpenMenu}>
        <Menu className={`icon menu-icon ${open ? "hidden" : ""}`} />
        <Close className={`icon close-icon ${open ? "show" : ""}`} />
      </div>
      <div className="toggle">
        <ToggleButton value={"check"} selected={darkMode} onChange={toggleDarkMode}>
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
};

export default Navbar;


// Link from react-router-dom is used for client-side navigation without page reloads
// means that it changes the browser’s address bar, but no component will render for that URL.
// to render the component, we need to set up routes using react-router-dom’s Route and Routes components.