import React from "react";
import { Link } from "react-router-dom";
import style from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={style.homepage}>
      <div className={style.heroSection}>
        <h1 className={style.heroTitle}>Campers of your dreams</h1>
        <p className={style.heroSubtitle}>
          You can find everything you want in our catalog
        </p>
        <Link className={style.viewNowBtn} to="/catalog">
          View Now
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
