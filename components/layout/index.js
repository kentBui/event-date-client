import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import styles from "@/styles/Layout.module.css";
import Showcase from "../shared/Showcase";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, desc, keywords }) => {
  const router = useRouter();
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
  };
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
      </Head>
      <ToastContainer options={options} />

      <Header />
      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "DJ events | Find the hottest parties",
  desc: " Find the lastest DJ and other musical events",
  keywords: "music, dj, event",
};

export default Layout;
