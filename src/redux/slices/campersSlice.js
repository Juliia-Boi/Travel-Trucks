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

// export const fetchCampers = createAsyncThunk(
//   "campers/fetchCampers",
//   async (filters) => {
//     const response = await axios.get(API_URL);
//     const campers = response.data.items;

//     const filteredCampers = campers.filter((camper) => {
//       if (filters.equipment && filters.equipment.length > 0) {
//         const matches = filters.equipment.every((filter) => {
//           const key = filterMapping[filter];
//           if (!key) return false;

//           if (key === "transmission") {
//             return camper[key] === "automatic";
//           }
//           return camper[key] === true;
//         });
//         if (!matches) return false;
//       }

//       if (
//         filters.location &&
//         !camper.location.toLowerCase().includes(filters.location.toLowerCase())
//       ) {
//         return false;
//       }

//       if (
//         filters.form &&
//         camper.form.toLowerCase().replace(/\s+/g, "_") !== filters.form
//       ) {
//         return false;
//       }

//       return true;
//     });
//     return filteredCampers;
//   }
// );

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 5, filters }) => {
    const sanitizedFilters = {
      ...filters,
      location: filters.location?.trim() || "",
      form: filters.form?.trim() || "",
    };

    const params = new URLSearchParams({
      page,
      limit,
      ...sanitizedFilters,
    });

    const response = await axios.get(`${API_URL}?${params}`);
    return response.data;
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
    pagination: {
      page: 1,
      totalPages: 1,
      totalItems: 0,
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
      const sanFilt = {
        ...action.payload,
        location: action.payload.location?.trim() || "",
        form: action.payload.form?.trim() || "",
      };
      state.filters = { ...state.filters, ...sanFilt };
      state.list = [];
      state.pagination.page = 1;
    },
    resetCampers: (state) => {
      state.list = [];
      state.pagination = {
        page: 1,
        totalPages: 1,
        totalItems: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { items, total } = action.payload;

        const newItems = items.filter(
          (item) =>
            !state.list.some((existingItem) => existingItem.id === item.id)
        );
        console.log("API resp: ", action.payload);
        state.list = [...state.list, ...newItems];

        state.pagination.totalItems = total;
        state.pagination.totalPages = Math.ceil(total / 5);
        state.pagination.page = Number(action.meta.arg.page) || 1;

        console.log("fetch ", action.meta.arg.page, "Res", action.payload);
        // state.pagination.page += 1;
      })
      .addCase(fetchCampers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { toggleFavorite, setFilters, resetCampers } =
  campersSlice.actions;
export default campersSlice.reducer;
