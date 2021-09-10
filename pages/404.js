import React from "react";
import styles from "@/styles/404.module.css";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "@/components/layout";

const NotFoundPage = () => {
  return (
    <Layout title="Not found page">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/">
          <a>Go back Home page</a>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
