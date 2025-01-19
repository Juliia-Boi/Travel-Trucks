import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./InformationForm.module.css";
import {
  BsWind,
  BsDiagram3,
  BsCupHot,
  BsFuelPump,
  BsUiRadios,
} from "react-icons/bs";
import { TbFridge } from "react-icons/tb";
import { PiShowerLight } from "react-icons/pi";
import { LuMicrowave } from "react-icons/lu";
import { CgAssign } from "react-icons/cg";
import { IoWaterOutline } from "react-icons/io5";

const featureIcons = {
  transmission: { icon: <BsDiagram3 />, label: "Automatic" },
  AC: { icon: <BsWind />, label: "AC" },
  engine: { icon: <BsFuelPump />, label: "Petrol" },
  kitchen: { icon: <BsCupHot />, label: "Kitchen" },
  radio: { icon: <BsUiRadios />, label: "Radio" },
  bathroom: { icon: <PiShowerLight />, label: "Bathroom" },
  refrigerator: { icon: <BsUiRadios />, label: "Refrigerator" },
  microwave: { icon: <LuMicrowave />, label: "Microwave" },
  gas: { icon: <CgAssign />, label: "Gas" },
  water: { icon: <IoWaterOutline />, label: "Water" },
};

const InformationForm = () => {
  const { id } = useParams();
  const { list: campers } = useSelector((state) => state.campers);

  const camper = campers.find((c) => c.id === id);

  if (!camper) {
    return <p>Loading features...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.featuresContainer}>
        {Object.entries(featureIcons).map(([key, { icon, label }]) =>
          camper[key] ? (
            <div key={key} className={styles.featureItem}>
              {icon}
              <span className={styles.featureText}>{label}</span>
            </div>
          ) : null
        )}
      </div>

      <h3 className={styles.sectionTitle}>Vehicle details</h3>
      <div className={styles.vehicleDetails}>
        <hr className={styles.separator} />
        <ul className={styles.detailsList}>
          <li>
            <span>Form</span> <span>{camper.form}</span>
          </li>
          <li>
            <span>Length</span> <span>{camper.length} m</span>
          </li>
          <li>
            <span>Width</span> <span>{camper.width} m</span>
          </li>
          <li>
            <span>Height</span> <span>{camper.height} m</span>
          </li>
          <li>
            <span>Tank</span> <span>{camper.tank} l</span>
          </li>
          <li>
            <span>Consumption</span> <span>{camper.consumption} l/100km</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InformationForm;
