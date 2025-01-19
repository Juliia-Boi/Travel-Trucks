import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams, Link, useLocation } from "react-router-dom";
import { fetchCampers } from "../../redux/slices/campersSlice";
import styles from "./CamperDetailsPage.module.css";
import CamperDetails from "../../components/CamperDetails/CamperDetails";
import BookingForm from "../../components/BookingForm/BookingForm";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list: campers } = useSelector((state) => state.campers);
  const location = useLocation();

  const camper = campers.find((c) => c.id === id);

  useEffect(() => {
    if (!campers.length) {
      dispatch(fetchCampers());
    }
  }, [dispatch, campers.length]);

  if (!camper) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <CamperDetails />

      <div className={styles.tabs}>
        <Link
          to="features"
          className={
            location.pathname.includes("features")
              ? styles.activeTab
              : styles.tab
          }
        >
          Features
        </Link>
        <Link
          to="reviews"
          className={
            location.pathname.includes("reviews")
              ? styles.activeTab
              : styles.tab
          }
        >
          Reviews
        </Link>
      </div>
      <div className={styles.detailsLayout}>
        <Outlet />
        <BookingForm />
      </div>
    </div>
  );
};

export default CamperDetailsPage;
