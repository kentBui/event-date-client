import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import styles from "@/styles/Layout.module.css";
import Showcase from "../shared/Showcase";
import { useRouter } from "next/router";

const Layout = ({ children, title, desc, keywords }) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
      </Head>
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
