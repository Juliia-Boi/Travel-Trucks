import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

const filterMapping = {
  AC: "AC",
  Automatic: "transmission",
  Kitchen: "kitchen",
  TV: "TV",
  Bathroom: "bathroom",
};

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters) => {
    const response = await axios.get(API_URL);
    const campers = response.data.items;

    const filteredCampers = campers.filter((camper) => {
      if (filters.equipment && filters.equipment.length > 0) {
        const matches = filters.equipment.every((filter) => {
          const key = filterMapping[filter];
          if (!key) return false;

          if (key === "transmission") {
            return camper[key] === "automatic";
          }
          return camper[key] === true;
        });
        if (!matches) return false;
      }

      if (
        filters.location &&
        !camper.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.form &&
        camper.form.toLowerCase().replace(/\s+/g, "_") !== filters.form
      ) {
        return false;
      }

      return true;
    });
    return filteredCampers;
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    list: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    filters: {
      location: "",
      equipment: [],
      form: "",
    },
    status: "idle",
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      if (state.favorites.includes(camperId)) {
        state.favorites = state.favorites.filter((id) => id !== camperId);
      } else {
        state.favorites.push(camperId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCampers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { toggleFavorite, setFilters } = campersSlice.actions;
export default campersSlice.reducer;
