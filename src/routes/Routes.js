import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

// import Home from "../container/Home/Home";
import CategoryDetails from "../container/Categories/CategoryDetails";
import Dashboard from "../container/Dashboard/Dashboard";
import ExploreCategory from "../container/Explore/ExploreCategory";
import Categories from "../container/CategorySwitch/Categories";
import SubCategories from "../container/SubCategorySwitch/SubCategory";
import Favourite from "../container/Favourite/Favourite";
import SearchPage from "../container/SearchPage/Seacrh";
import SettingPage from "../container/Setting/SettingPage";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/Category" element={<CategoryDetails />} />
      <Route exact path="/ExploreCategory" element={<ExploreCategory />} />
      <Route exact path="/Categories" element={<Categories />} />
      <Route exact path="/SubCategories" element={<SubCategories />} />
      <Route exact path="/Favourite" element={<Favourite />} />
      <Route exact path="/SearchPage" element={<SearchPage />} />
      <Route exact path="/SettingPage" element={<SettingPage />} />
    </>
  )
);
