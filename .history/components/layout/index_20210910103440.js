import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, title, desc, keywords }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className="container">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "DJ events | Find the hottest parties",
  desc: " Find the lastest DJ and other musical events",
  keywords: "music, dj, event",
};

export default Layout;
