import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingForm.module.css";
import { useState } from "react";

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);
  const ProfileValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .min(3, "Too short!")
      .max(50, "Too long!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Required")
      .min(3, "Too short!")
      .max(50, "Too long!"),
    bookingDate: Yup.date()
      .required("Required")
      .min(new Date(), "Date must be in the future"),
  });

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Book your campervan now</h2>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          bookingDate: "",
          comment: "",
        }}
        validationSchema={ProfileValidationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Form Submitted", values);
          resetForm();
          setStartDate(null);
          alert("Booking successful!");
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className={styles.form}>
            <div className={styles.inputContainer}>
              <Field
                type="text"
                name="name"
                placeholder="Name*"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.inputContainer}>
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={styles.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.inputContainer}>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setFieldValue("bookingDate", date);
                }}
                placeholderText="Booking date*"
                className={styles.input}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                isClearable
                autoComplete="off"
              />
              <ErrorMessage
                name="bookingDate"
                component="div"
                className={styles.error}
              />
            </div>

            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={styles.textarea}
            />
            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
