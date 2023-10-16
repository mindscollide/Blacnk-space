import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockUnBlockCategoryApi } from "../../../store/Actions/Actions";
import "./HeadingHoldPU.css";

const HeadingHoldPU = ({
  listing,
  parentIndex,
  parentcategoryID,
  dashboardInformation,
  setActiveCategory,
}) => {
  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );
  const dispatch = useDispatch();
  const handleSwitchChange = async () => {
    let unselectCategoryID = [
      {
        CategoryID: parentcategoryID,
        BlockUnBlockCategoryEnum: 1,
      },
    ];
    let filterData = [...dashboardInformation];
    filterData.splice(parentIndex, 1);
    const newArrOtherAvailableList = filterData.map((item) => item.categoryID);
    let categoryUnblock = {
      UserID: "PLU_1",
      Latitude: locationLatitude,
      Longitude: locationLongitude,
      CategoryWithStatuses: unselectCategoryID, // in this newIds we have selected categoryId and categoryName
      OtherAvailableListings: newArrOtherAvailableList, // this will send the other array in this list
    };
    setActiveCategory(null);
    await dispatch(blockUnBlockCategoryApi(categoryUnblock));
  };

  return (
    <Fragment>
      <div className="heading-long-press-popup">
        <div className="heading-long-press-main">
          <span
            className="heading-long-pressdisplay-block"
            onClick={() => setActiveCategory(null)}
          >
            <i className="icon-plus icon-class"></i>
            <span className="heading-long-main-options">Add Business</span>
          </span>

          <span
            className="heading-long-pressdisplay-block-category"
            onClick={() => handleSwitchChange()}
          >
            <i className="icon-disabled icon-class"></i>
            <span className="heading-long-main-options">Block Category</span>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default HeadingHoldPU;
