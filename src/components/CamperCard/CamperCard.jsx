import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCampers, toggleFavorite } from "../../redux/slices/campersSlice";
import styles from "./CamperCard.module.css";
import { FaStar } from "react-icons/fa";
import { BsWind, BsDiagram3, BsCupHot, BsHeart, BsMap } from "react-icons/bs";
import { HiOutlineTv } from "react-icons/hi2";
import { PiShowerLight } from "react-icons/pi";
import { InfinitySpin } from "react-loader-spinner";

const CamperCard = () => {
  const dispatch = useDispatch();

  const campers = useSelector((state) => state.campers.list || []);
  const filters = useSelector((state) => state.campers.filters || {});
  const favorites = useSelector((state) => state.campers.favorites || []);
  const status = useSelector((state) => state.campers.status);

  // const { campers, filters, favorites, status } = useSelector(
  //   (state) => state.campers
  // );

  const filterItems = [
    { label: "AC", icon: <BsWind />, key: "AC" },
    { label: "Automatic", icon: <BsDiagram3 />, key: "transmission" },
    { label: "Kitchen", icon: <BsCupHot />, key: "kitchen" },
    { label: "TV", icon: <HiOutlineTv />, key: "TV" },
    { label: "Bathroom", icon: <PiShowerLight />, key: "bathroom" },
  ];

  useEffect(() => {
    if (!status || status === "idle") {
      dispatch(fetchCampers(filters));
    }
  }, [dispatch, filters, status]);

  if (status === "failed") {
    return (
      <p className={styles.error}>
        Failed to load campers. Please try again later.
      </p>
    );
  }

  const handleFavoriteClick = (id) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className={styles.cardContainer}>
      {status === "loading" && (
        <InfinitySpin
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      )}
      {Array.isArray(campers) && campers.length > 0 ? (
        campers.map((camper) => (
          <div key={camper.id} className={styles.card}>
            <img
              src={
                camper.gallery[0]?.thumb || "https://via.placeholder.com/150"
              }
              alt={camper.name}
              className={styles.image}
            />
            <div className={styles.cardContent}>
              <div className={styles.headerRow}>
                <h3 className={styles.title}>{camper.name}</h3>
                <div className={styles.priceFavoriteWrapper}>
                  <p className={styles.price}>€{camper.price.toFixed(2)}</p>
                  <button
                    className={`${styles.favoriteButton} ${
                      favorites.includes(camper.id) ? styles.active : ""
                    }`}
                    onClick={() => handleFavoriteClick(camper.id)}
                  >
                    <BsHeart />
                  </button>
                </div>
              </div>
              <div className={styles.ratingAndLocation}>
                <span className={styles.rating}>
                  <FaStar className={styles.starIcon} />
                  {camper.rating.toFixed(1)} ({camper.reviews.length} Reviews)
                </span>
                <span className={styles.location}>
                  <BsMap className={styles.locationIcon} /> {camper.location}
                </span>
              </div>
              <p className={styles.description} title={camper.description}>
                {camper.description.length > 100
                  ? camper.description.substring(0, 100) + "..."
                  : camper.description}
              </p>
              <div className={styles.features}>
                {filterItems.map(
                  (item) =>
                    camper[item.key] && (
                      <span key={item.label} className={styles.feature}>
                        {item.icon} {item.label}
                      </span>
                    )
                )}
              </div>
              <Link className={styles.linkButton} to={`/catalog/${camper.id}`}>
                Show more
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noItems}>No campers match your filters</p>
      )}
    </div>
  );
};

export default CamperCard;
