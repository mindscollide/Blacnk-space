import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import Home from "../container/Home/Home";
import CategoryDetails from "../container/Categories/CategoryDetails";
import Dashboard from "../container/Dashboard/Dashboard";
import ExploreCategory from "../container/Explore/ExploreCategory";
import Categories from "../container/CategorySwitch/Categories";
import SubCategories from "../container/SubCategorySwitch/SubCategory";
import Favourite from "../container/Favourite/Favourite";
import SearchPage from "../container/SearchPage/Seacrh";
import SettingPage from "../container/Setting/SettingPage";
import PrivateRoutes from "./PrivateRoutes";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
        <Route exact path="/BlankSpace/" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="Category" element={<CategoryDetails />} />
          <Route path="ExploreCategory" element={<ExploreCategory />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="SubCategories" element={<SubCategories />} />
          <Route path="Favourite" element={<Favourite />} />
          <Route path="SearchPage" element={<SearchPage />} />
          <Route path="SettingPage" element={<SettingPage />} />
        </Route>
      </Route>
    </>
  )
);
