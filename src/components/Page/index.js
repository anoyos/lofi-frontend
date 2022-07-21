import React, { useEffect, useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";

const Page = ({ children }) => {
  const { pathname } = useLocation();
  const [opacity, setOpacity] = useState('1');

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);
  
  return (
    <div className={styles.page}>
      <Header mobileNav={(opacity) => setOpacity(opacity) } />
      <div style={{ opacity: `${opacity}` }} className={styles.inner} >{children}</div>
      <Footer opacity={opacity} />
    </div>
  );
};

export default withRouter(Page);
