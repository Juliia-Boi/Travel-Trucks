import React from "react";
import { useSelector } from "react-redux";
import CamperCard from "../../components/CamperCard/CamperCard";

const FavoritePage = () => {
  const campers = useSelector((state) => state.campers.list || []);
  const favorites = useSelector((state) => state.campers.favorites || []);

  const favoriteCampers = campers.filter((camper) =>
    favorites.includes(camper.id)
  );
  return (
    <div>
      {favoriteCampers.length > 0 ? (
        <div>
          {favoriteCampers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
      ) : (
        <p>No favorites</p>
      )}
    </div>
  );
};

export default FavoritePage;
