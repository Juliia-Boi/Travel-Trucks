import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./Reviews.module.css";

const Reviews = () => {
  const { id } = useParams();
  const { list: campers } = useSelector((state) => state.campers);

  const camper = campers.find((c) => c.id === id);

  if (!camper || !camper.reviews) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className={styles.container}>
      {camper.reviews.map((review, index) => (
        <div key={index} className={styles.reviewCard}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              <span className={styles.avatarLetter}>
                {review.reviewer_name.charAt(0)}
              </span>
            </div>
            <div className={styles.reviewerInfo}>
              <strong className={styles.reviewerName}>
                {review.reviewer_name}
              </strong>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) =>
                  i < review.reviewer_rating ? (
                    <FaStar key={i} className={styles.starFilled} />
                  ) : (
                    <FaRegStar key={i} className={styles.starEmpty} />
                  )
                )}
              </div>
            </div>
          </div>
          <p className={styles.comment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
