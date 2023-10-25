import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";

import {
  getAllCategoriesApi,
  subCategoryParentApi,
  blockUnBlockCategoryApi,
  cleareAllCategoriesSuccess,
} from "../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./../../components/Elements";

import "./Categories.css";
import { getRndomeNumber } from "../../common/Function/utils";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get reducers from Action_Reducers
  const locationLatitude = useSelector(
    (state) => state.actionReducer.locationLatitude
  );
  const locationLongitude = useSelector(
    (state) => state.actionReducer.locationLongitude
  );
  const getAllCategoriesUser = useSelector(
    (state) => state.actionReducer.getAllCategoriesUser
  );
  const Loading = useSelector((state) => state.actionReducer.Loading);
  const [loderShow, setLoderShow] = useState(true);

  //state for main Categories Information
  const [categoriesInformation, setCategoriesInformation] = useState([]);

  //state for subCategory BlockUnBlockCategory
  const [categoryBlockUnblock, setCategoryBlockUnblock] = useState({
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

  const [showMessage, setShowMessage] = useState(false);

  const handleSwitchChange = async (checked, categoryIndex) => {
    let newIds = [];
    let newArrOtherAvailableList = [];
    let copyCategoryInformation = [...categoriesInformation];
    let getSubCategoryIndex = copyCategoryInformation.findIndex(
      (data, index) => index === categoryIndex
    );

    // this will update the each subCategory
    let updatedCategory = { ...copyCategoryInformation[getSubCategoryIndex] };
    updatedCategory.isBlocked = checked;
    copyCategoryInformation[getSubCategoryIndex] = updatedCategory;
    setCategoriesInformation(copyCategoryInformation);

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
    let categoryUnblock = {
      UserID: categoryBlockUnblock.UserID.value,
      Latitude: locationLatitude,
      Longitude: locationLongitude,
      CategoryWithStatuses: newIds, // in this newIds we have selected categoryId and categoryName
      OtherAvailableListings: newArrOtherAvailableList, // this will send the other array in this list
    };

    let mainCategories = {
      UserID: "PLU_1",
    };

    await dispatch(
      blockUnBlockCategoryApi(categoryUnblock, navigate, mainCategories, 1)
    );

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  //onClick handler in Title
  const clickTitleHandler = async (categoryData) => {
    let newHandlerClick = {
      UserID: "PLU_1",
      CategoryID: categoryData.categoryID,
    };
    // await localStorage.setItem(
    //   "subCAtParentID",
    //   JSON.stringify(newHandlerClick)
    // );
    // navigate("/BlankSpace/SubCategories");
    dispatch(subCategoryParentApi(navigate, newHandlerClick));
  };

  // useEffect for main getAllCategories
  useEffect(() => {
    let mainCategories = {
      UserID: "PLU_1",
    };
    dispatch(getAllCategoriesApi(mainCategories));
    return () => {
      dispatch(cleareAllCategoriesSuccess());
      setCategoriesInformation([]);
      setLoderShow(true);
    };
  }, []);

  // useEffect for getting data from reducers
  useEffect(() => {
    if (
      getAllCategoriesUser !== null &&
      getAllCategoriesUser !== undefined &&
      getAllCategoriesUser.length !== 0
    ) {
      setCategoriesInformation(getAllCategoriesUser);
      setLoderShow(false);
    }
  }, [getAllCategoriesUser]);
  return (
    <Container className="backgroundBody">
      {Loading && loderShow ? (
        <Loader />
      ) : (
        <Row>
          <Col>
            {categoriesInformation !== null &&
            categoriesInformation !== undefined &&
            categoriesInformation.length > 0
              ? categoriesInformation.map((categoriesListing, index) => {
                  return (
                    <Row
                      className="category-bottom"
                      key={categoriesListing.categoryID}
                    >
                      <Col
                        lg={6}
                        md={6}
                        sm={6}
                        xs={6}
                        className="d-flex justify-content-start"
                      >
                        <span
                          id={categoriesListing.categoryID}
                          className={
                            categoriesListing.isBlocked
                              ? "SitchOn-Category-Title"
                              : "Switch-Category-Title"
                          }
                          onClick={() =>
                            !categoriesListing.isBlocked &&
                            clickTitleHandler(categoriesListing)
                          }
                        >
                          {categoriesListing.categoryName}

                          <i className="icon-link"></i>
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
                            checked={categoriesListing.isBlocked}
                            onChange={(checked) =>
                              handleSwitchChange(checked, index)
                            }
                            size="default"
                            className="switch-color"
                          />
                        </span>
                        {showMessage && (
                          <div className="message-item-category">
                            {categoriesListing.isBlocked
                              ? "Category Blocked"
                              : "Category Unblocked"}
                          </div>
                        )}
                      </Col>
                    </Row>
                  );
                })
              : null}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Categories;
