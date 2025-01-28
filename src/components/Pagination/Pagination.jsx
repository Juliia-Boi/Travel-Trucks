import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/slices/campersSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, totalPages, totalItems } = useSelector(
    (state) => state.campers.pagination
  );
  const filters = useSelector((state) => state.campers.filters);
  const campers = useSelector((state) => state.campers.list);

  console.log("Page:", page, "Tota", totalPages, "items", totalItems);

  const handleChangePage = () => {
    if (page <= totalPages) {
      const sanFilt = {
        ...filters,
        location: filters.location?.trim() || "",
        form: filters.form?.trim() || "",
      };
      dispatch(
        fetchCampers({ page: Number(page) + 1, limit: 5, filters: sanFilt })
      );
    }
  };
  return (
    <div>
      {page <= totalPages && campers.length > 0 && (
        <button onClick={handleChangePage}>Load More</button>
      )}
    </div>
  );
};

export default Pagination;
