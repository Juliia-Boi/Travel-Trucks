import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage/CatalogPage.jsx";
import CamperDetailsPage from "./pages/CamperDetailsPage/CamperDetailsPage.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
// import FavoritePage from "./pages/FavoritePage/FavoritePage.jsx";
import InformationForm from "./components/InfotrmationForm/InformationForm.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/catalog",
        element: <CatalogPage />,
      },
      {
        path: "catalog/:id",
        element: <CamperDetailsPage />,
        children: [
          {
            index: true,
            element: <InformationForm />,
          },
          {
            path: "features",
            element: <InformationForm />,
          },
          {
            path: "reviews",
            element: <Reviews />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
