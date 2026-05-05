import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { theme, changeTheme } = useTheme();

  const toggleTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>
        
        <li className={styles["toggle-btn"]} onClick={toggleTheme}>
           <span style={{ cursor: 'pointer', fontSize: '1.5em' }}>
             {theme === 'light' ? '🌙' : '☀️'}
           </span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>Hello, {user.displayName}</li>

            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
