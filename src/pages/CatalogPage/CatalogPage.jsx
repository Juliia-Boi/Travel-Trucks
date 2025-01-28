import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers, resetCampers } from "../../redux/slices/campersSlice";
import Filters from "../../components/Filters/Filters";
import CamperCard from "../../components/CamperCard/CamperCard";
import styles from "./CatalogPage.module.css";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { list: campers, filters } = useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  return (
    <section className={styles.card}>
      <div className={styles.card__container}>
        <Filters />
        <CamperCard />
      </div>
    </section>
  );
};

export default CatalogPage;
