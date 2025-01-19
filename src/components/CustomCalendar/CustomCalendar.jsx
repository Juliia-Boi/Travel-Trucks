import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CustomCalendar.module.css";

const CustomCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.calendarWrapper}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
        calendarClassName={styles.customCalendar}
        dayClassName={(date) =>
          date.getDate() === startDate.getDate() ? styles.selectedDay : ""
        }
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.header}>
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={styles.navButton}
            >
              &lt;
            </button>
            <span className={styles.monthTitle}>
              {date.toLocaleString("default", { month: "long" })}{" "}
              {date.getFullYear()}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={styles.navButton}
            >
              &gt;
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default CustomCalendar;
