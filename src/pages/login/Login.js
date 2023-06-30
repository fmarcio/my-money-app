import React, { useState } from "react";
import styles from "./Login.module.css";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    // brackets here are to avoid hifen be confused as a minus sign
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
        />
      </label>

      {!isPending && <button className="btn">Login</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading..
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
