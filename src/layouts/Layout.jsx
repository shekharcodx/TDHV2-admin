import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar"
import Header from "../components/Header/Header";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.layoutContainer}>
      <Sidebar />

      <div className={styles.contentWrapper}>

        <Header />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
