import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !passwordConfirm) {
      toast.error("Please fill all filed");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Password does not match");
      return;
    }
  };

  return (
    <div className={styles.auth}>
      <h1>
        <FaUser /> Register
      </h1>
      <form onSubmit={handleSubmitRegister}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Register" className="btn btn-secondary" />
        </div>
        <p>
          Have an account ?{" "}
          <Link href="/account/login">
            <a>Login</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
