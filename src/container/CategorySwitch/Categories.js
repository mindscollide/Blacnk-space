import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import {
  Header,
  UserInfo,
  CategoryHeader,
  CategoryUser,
} from "../../components/Layout";
import {
  getAllCategoriesApi,
  subCategoryParentApi,
  blockUnBlockCategoryApi,
} from "../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./../../components/Elements";

import "./Categories.css";
import { getRndomeNumber } from "../../common/Function/utils";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get reducers from Action_Reducers
  const { actionReducer } = useSelector((state) => state);

  //state for main Categories Information
  const [categoriesInformation, setCategoriesInformation] = useState([]);
  console.log(
    categoriesInformation,
    "categoriesInformationcategoriesInformation"
  );
  //state for Main Categories
  const [mainCategory, setMainCategory] = useState({
    userID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // State for Parent Categories
  const [parentCategory, setParentCategory] = useState({
    UserID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },
    CategoryID: {
      value: "CDL_1",
      errorMessage: "",
      errorStatus: false,
    },
  });

  //state for subCategory BlockUnBlockCategory
  const [categoryBlockUnblock, setCategoryBlockUnblock] = useState({
    UserID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },
    Latitude: {
      value: actionReducer.locationLatitude,
      errorMessage: "",
      errorStatus: false,
    },

    Longitude: {
      value: actionReducer.locationLongitude,
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

  // state for loader
  // const [showLoader, setShowLoader] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const [isHome, setIsHome] = useState(false);

  const handleSwitchChange = async (checked, categoryIndex) => {
    console.log(checked, categoryIndex, "checkedchecked");
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
      Latitude: actionReducer.locationLatitude,
      Longitude: actionReducer.locationLongitude,
      CategoryWithStatuses: newIds, // in this newIds we have selected categoryId and categoryName
      OtherAvailableListings: newArrOtherAvailableList, // this will send the other array in this list
    };
    let mainCategories = {
      UserID: mainCategory.userID.value,
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
  const clickTitleHandler = (categoryData) => {
    console.log("categoryData", { categoryData });
    let newHandlerClick = {
      UserID: parentCategory.UserID.value,
      CategoryID: categoryData.categoryID,
    };
    dispatch(subCategoryParentApi(navigate, newHandlerClick));
  };

  // useEffect for main getAllCategories
  useEffect(() => {
    let mainCategories = {
      UserID: mainCategory.userID.value,
    };
    dispatch(getAllCategoriesApi(mainCategories));
  }, []);
  console.log("actionReducer", actionReducer);

  // useEffect for getting data from reducers
  useEffect(() => {
    if (
      actionReducer.getAllCategoriesUser !== null &&
      actionReducer.getAllCategoriesUser !== undefined &&
      actionReducer.getAllCategoriesUser.length !== 0
    ) {
      setCategoriesInformation(actionReducer.getAllCategoriesUser);
    }
  }, [actionReducer.getAllCategoriesUser]);

  return (
    <Container>
      <Row>
        <Col>
          {categoriesInformation !== null &&
          categoriesInformation !== undefined &&
          categoriesInformation.length > 0
            ? categoriesInformation.map((categoriesListing, index) => {
                return (
                  <Row className="category-bottom" key={getRndomeNumber()}>
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
                          className="switch-color"
                        />
                      </span>
                      {showMessage && (
                        <div className="message-item-category">
                          {categoriesListing.isBlocked
                            ? "Category Blocked"
                            : "Category UnBlocked"}
                        </div>
                      )}
                    </Col>
                  </Row>
                );
              })
            : null}
          {actionReducer.Loading ? <Loader /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;
