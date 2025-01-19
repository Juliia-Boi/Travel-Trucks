import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers, setFilters } from "../../redux/slices/campersSlice";

import {
  BsWind,
  BsDiagram3,
  BsCupHot,
  BsGrid1X2,
  BsGrid,
  BsGrid3X3Gap,
  BsMap,
} from "react-icons/bs";
import { HiOutlineTv } from "react-icons/hi2";
import { PiShowerLight } from "react-icons/pi";

import styles from "./Filters.module.css";

const Filters = () => {
  const disaptch = useDispatch();
  const filters = useSelector((state) => state.campers.filters);

  const [localFilters, setLocalFilters] = useState(filters);
  const [offer, setOffer] = useState([]);

  const locations = [
    "Kyiv, Ukraine",
    "Poltava, Ukraine",
    "Dnipro, Ukraine",
    "Odesa, Ukraine",
    "Kharkiv, Ukraine",
    "Sumy, Ukraine",
    "Lviv, Ukraine",
  ];

  const filterItems = [
    { label: "AC", icon: <BsWind /> },
    { label: "Automatic", icon: <BsDiagram3 /> },
    { label: "Kitchen", icon: <BsCupHot /> },
    { label: "TV", icon: <HiOutlineTv /> },
    { label: "Bathroom", icon: <PiShowerLight /> },
  ];

  const vehicleTypes = [
    { label: "Van", icon: <BsGrid1X2 /> },
    { label: "Fully Integrated", icon: <BsGrid /> },
    { label: "Alcove", icon: <BsGrid3X3Gap /> },
  ];

  useEffect(() => {
    if (localFilters.location) {
      setOffer(
        locations.filter((loc) =>
          loc.toLowerCase().includes(localFilters.location.toLowerCase())
        )
      );
    } else {
      setOffer([]);
    }
  }, [localFilters.location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEquiment = (item) => {
    setLocalFilters((prev) => {
      const updateEquiment = prev.equipment.includes(item)
        ? prev.equipment.filter((filter) => filter !== item)
        : [...prev.equipment, item];
      return { ...prev, equipment: updateEquiment };
    });
  };

  const selectLocation = (location) => {
    setLocalFilters((prev) => ({
      ...prev,
      location,
    }));
    setOffer([]);
  };

  const selectVehicleType = (form) => {
    const normalizeForm = form.toLowerCase().replace(/\s+/g, "");
    setLocalFilters((prev) => ({
      ...prev,
      form: prev.form === form ? "" : normalizeForm,
    }));
  };

  const resetFilter = () => {
    const initialFilters = {
      location: "",
      equipment: [],
      form: "",
    };
    setLocalFilters(initialFilters);
    disaptch(setFilters(initialFilters));
    disaptch(fetchCampers(initialFilters));
  };

  const applyFilters = () => {
    disaptch(setFilters(localFilters));
    disaptch(fetchCampers(localFilters));
  };

  const hasActiveFilters = () => {
    return (
      localFilters.location ||
      localFilters.equipment.length > 0 ||
      localFilters.form
    );
  };

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="location" className={styles.label}>
          Location
        </label>
        <div className={styles.inputWrapper}>
          <BsMap className={styles.iconInput} />
          <input
            type="text"
            id="location"
            name="location"
            value={localFilters.location || ""}
            onChange={handleInputChange}
            placeholder="Enter location"
            className={styles.input}
          />
          {offer.length > 0 && (
            <ul className={styles.dropdown}>
              {offer.map((loc) => (
                <li
                  key={loc}
                  className={`${styles.dropdownItem}`}
                  onClick={() => selectLocation(loc)}
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className={styles.filterText}>Filters</p>
      <div className={styles.section}>
        <h3 className={styles.title}>Vehicle equipment</h3>
        <div className={styles.grid}>
          {filterItems.map(({ label, icon }) => (
            <button
              key={label}
              className={`${styles.button} ${
                localFilters.equipment.includes(label) ? styles.active : ""
              }`}
              onClick={() => toggleEquiment(label)}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h3 className={styles.title}>Vehicle Type</h3>
        <div className={styles.grid}>
          {vehicleTypes.map(({ label, icon }) => (
            <button
              key={label}
              className={`${styles.button} ${
                localFilters.type === label ? styles.active : ""
              }`}
              onClick={() => selectVehicleType(label)}
            >
              <span className={styles.icon}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.btnBox}>
        <button className={styles.searchButton} onClick={applyFilters}>
          Save
        </button>
        {hasActiveFilters() && (
          <button className={styles.resButton} onClick={resetFilter}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
