import React, { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all filed");
      return;
    }
  };

  return (
    <div className={styles.auth}>
      <h1>
        <FaUser /> Login
      </h1>
      <form onSubmit={handleSubmitLogin}>
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
          <input type="submit" value="Login" className="btn" />
        </div>
        <p>
          Do not have an account ?{" "}
          <Link href="/account/register">
            <a>Register</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
