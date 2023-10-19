import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import {
  getAllSubCategoriesApi,
  blockUnBlockCategoryApi,
  subCategoryParentApi,
} from "../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./../../components/Elements";

import "./SubCategory.css";
import { useNavigate } from "react-router-dom";
import { getRndomeNumber } from "../../common/Function/utils";

const SubCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );
  const getParentCategory = useSelector(
    (state) => state.actionReducer.getParentCategory
  );
  const Loading = useSelector((state) => state.actionReducer.Loading);

  //   const navigate = useNavigate();

  const [isHome, setIsHome] = useState(false);

  // state for main sub category Information
  const [subCategoryInformation, setSubCategoryInformation] = useState([]);

  //state for subCategory BlockUnBlockCategory
  const [blockUnblock, setBlockUnblock] = useState({
    UserID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },

    Latitude: {
      value: locationLatitude,
      errorMessage: "",
      errorStatus: false,
    },

    Longitude: {
      value: locationLongitude,
      errorMessage: "",
      errorStatus: false,
    },
    CategoryWithStatuses: [
      {
        CategoryID: {
          value: "CDL_1",
          errorMessage: "",
          errorStatus: false,
        },
        BlockUnBlockCategoryEnum: {
          value: 2,
          errorMessage: "",
          errorStatus: false,
        },
      },
    ],
    OtherAvailableListings: {
      value: ["BUL_0x3eb33eb15fc7bfcf:0x4f43996895406161"],
      errorMessage: "",
      errorStatus: false,
    },
  });

  // state for Sub Category
  const [subCategoryState, setSubCategoryState] = useState({
    userID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // state for loader
  let CategoryId = localStorage.getItem("CGID");
  const [showMessage, setShowMessage] = useState(false);
  const [entertainmentMessage, setEntertainmentMessage] = useState(false);
  const [switchBlockAll, setSwitchBlockAll] = useState(false);

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      let newHandlerClick = {
        UserID: "PLU_1",
        CategoryID: CategoryId,
      };
      dispatch(subCategoryParentApi(navigate, newHandlerClick));
    } else {
      console.info("This page is not reloaded");
    }
  }, []);

  const handleBlockAllChange = async (checked) => {
    console.log(checked, "checkedcheckedchecked");
    setSwitchBlockAll(!switchBlockAll);
    let newIds = []; // Declare newIds outside the if-else blocks

    if (checked) {
      if (subCategoryInformation.length > 0) {
        subCategoryInformation.map((data, index) => {
          newIds.push({
            CategoryID: data.categoryID,
            BlockUnBlockCategoryEnum: 1,
          });
        });
        let subCategoryUnblock = {
          UserID: blockUnblock.UserID.value,
          Latitude: locationLatitude,
          Longitude: locationLongitude,
          CategoryWithStatuses: newIds,
          OtherAvailableListings: [],
        };
        let newHandlerClick = {
          UserID: "PLU_1",
          CategoryID: CategoryId,
        };
        await dispatch(
          blockUnBlockCategoryApi(subCategoryUnblock, navigate, newHandlerClick)
        );
      }
    } else {
      if (subCategoryInformation.length > 0) {
        subCategoryInformation.map((data, index) => {
          newIds.push({
            CategoryID: data.categoryID,
            BlockUnBlockCategoryEnum: 2,
          });
        });
        let subCategoryUnblock = {
          UserID: blockUnblock.UserID.value,
          Latitude: locationLatitude,
          Longitude: locationLongitude,
          CategoryWithStatuses: newIds,
          OtherAvailableListings: [],
        };

        let newHandlerClick = {
          UserID: "PLU_1",
          CategoryID: CategoryId,
        };
        await dispatch(
          blockUnBlockCategoryApi(subCategoryUnblock, navigate, newHandlerClick)
        );

        // dispatch(getAllSubCategoriesApi(subCategory));
      }
    }

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };
  console.log(
    subCategoryInformation,
    "subCategoryInformationsubCategoryInformation"
  );
  // handler for single category block and unblock
  const handlerEntertainmentChange = async (checked, subCategoryIndex) => {
    console.log(checked, subCategoryIndex, "checkedchecked");
    let newIds = [];
    let newArrOtherAvailableList = [];
    let copyCategoryInformation = [...subCategoryInformation];
    let getSubCategoryIndex = copyCategoryInformation.findIndex(
      (data, index) => index === subCategoryIndex
    );

    // this will update the each subCategory
    let updatedCategory = { ...copyCategoryInformation[getSubCategoryIndex] };
    updatedCategory.isBlocked = checked;
    copyCategoryInformation[getSubCategoryIndex] = updatedCategory;
    setSubCategoryInformation(copyCategoryInformation);

    // this will push the newIds data into otherlistArray
    newIds.push({
      CategoryID: copyCategoryInformation[getSubCategoryIndex].categoryID,
      BlockUnBlockCategoryEnum: checked === true ? 1 : 2,
    });

    // this will filter data in from copyCategory
    copyCategoryInformation
      .filter((data, index) => index !== getSubCategoryIndex)
      .map((mapValue, index) =>
        newArrOtherAvailableList.push(mapValue.categoryID)
      );

    // this will send data to Api where we give the OtherAvailable array which is not selected
    let subCategoryUnblock = {
      UserID: blockUnblock.UserID.value,
      Latitude: locationLatitude,
      Longitude: locationLongitude,
      CategoryWithStatuses: newIds, // in this newIds we have selected categoryId and categoryName
      OtherAvailableListings: newArrOtherAvailableList, // this will send the other array in this list
    };
    let newHandlerClick = {
      UserID: "PLU_1",
      CategoryID: CategoryId,
    };
    await dispatch(
      blockUnBlockCategoryApi(subCategoryUnblock, navigate, newHandlerClick)
    );

    setEntertainmentMessage(true);
    setTimeout(() => {
      setEntertainmentMessage(false);
    }, 1000);
  };
  // useEffect for getting data from reducers
  useEffect(() => {
    if (
      getParentCategory !== null &&
      getParentCategory !== undefined &&
      getParentCategory.length > 0
    ) {
      setSubCategoryInformation(getParentCategory);
    }
  }, [getParentCategory]);

  return (
    <Container className="backgroundBody">
      <Fragment key={getRndomeNumber()}>
        <Row className="Sub-Category-margintop">
          <Col
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className="d-flex justify-content-start"
          >
            <span
              className={
                switchBlockAll
                  ? "sub-category-BlockAll-switch"
                  : "sub-category-BlockAll-switch"
              }
            >
              {switchBlockAll ? "unBlock all" : "Block All"}
            </span>
          </Col>
          <Col
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className="d-flex justify-content-end"
          >
            <span>
              <Switch
                checked={switchBlockAll}
                onChange={handleBlockAllChange}
                className="Sub-switch-color"
              />
            </span>
            {showMessage && (
              <div className="message-item-Sub-category">
                {switchBlockAll
                  ? "All sub Category Blocked"
                  : "All sub Category UnBlocked"}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {subCategoryInformation !== null &&
            subCategoryInformation !== undefined &&
            subCategoryInformation.length > 0
              ? subCategoryInformation.map((subCategoryListing, index) => {
                  return (
                    <Fragment key={subCategoryListing.categoryID}>
                      <Row className="Sub-Btm-Line-category mt-3">
                        <Col
                          lg={6}
                          md={6}
                          sm={6}
                          xs={6}
                          className="d-flex justify-content-start"
                        >
                          <span
                            id={subCategoryListing.categoryID}
                            className={
                              switchBlockAll
                                ? "SitchOn-Category-Title"
                                : subCategoryListing.isBlocked
                                ? "SitchOn-Category-Title"
                                : "Switch-Category-Title"
                            }
                          >
                            {subCategoryListing.categoryName}
                          </span>
                        </Col>
                        <Col
                          lg={6}
                          md={6}
                          sm={6}
                          xs={6}
                          className="d-flex justify-content-end"
                        >
                          <span>
                            <Switch
                              checked={
                                switchBlockAll || subCategoryListing.isBlocked
                              }
                              onChange={(checked) =>
                                handlerEntertainmentChange(checked, index)
                              }
                              className="Sub-switch-color"
                            />
                          </span>
                          {entertainmentMessage && (
                            <div className="message-item-Sub-category">
                              {subCategoryListing.isBlocked
                                ? "sub Category Blocked"
                                : "sub Category UnBlocked"}
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Fragment>
                  );
                })
              : null}
          </Col>
        </Row>
        {Loading ? <Loader /> : null}
      </Fragment>
    </Container>
  );
};

export default SubCategories;
