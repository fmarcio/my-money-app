import React, { useState, FormEvent } from "react";
import styles from "./Login.module.css";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long");
      return;
    }

    login(email, password);
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value.length >= 6) setValidationError(null);
          }}
          type="password"
          value={password}
          required
        />
      </label>

      {validationError && <p style={{ color: "red", fontSize: "14px", margin: "10px 0" }}>{validationError}</p>}

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
