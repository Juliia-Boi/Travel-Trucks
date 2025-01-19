import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCampers } from "../../redux/slices/campersSlice";
import styles from "./CamperDetails.module.css";
import { FaStar } from "react-icons/fa";
import { BsMap } from "react-icons/bs";
// import InfotrmationForm from "../InfotrmationForm/InfotrmationForm";

const CamperDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list: campers, status } = useSelector((state) => state.campers);

  useEffect(() => {
    if (!campers.length) {
      dispatch(fetchCampers());
    }
  }, [dispatch, campers.length]);

  const camper = campers.find((c) => c.id === id);

  if (status === "failed") {
    return <p>Failed</p>;
  }

  if (!camper) {
    return <p className={styles.error}>Camper not found.</p>;
  }

  return (
    <div className={`${styles.container} container`}>
      <h2 className={styles.title}>{camper.name}</h2>
      <div className={styles.infoRow}>
        <span className={styles.rating}>
          <FaStar className={styles.iconStar} /> {camper.rating.toFixed(1)} (
          {camper.reviews.length} Reviews)
        </span>
        <span className={styles.location}>
          <BsMap className={styles.icon} /> {camper.location}
        </span>
      </div>
      <p className={styles.price}>€{camper.price.toFixed(2)}</p>

      <div className={styles.gallery}>
        {camper.gallery.map((image, index) => (
          <img
            key={index}
            src={image.original || "https://via.placeholder.com/150"}
            alt={`${camper.name} - ${index + 1}`}
            className={styles.galleryImage}
          />
        ))}
      </div>

      <p className={styles.description}>{camper.description}</p>
    </div>
  );
};

export default CamperDetails;
