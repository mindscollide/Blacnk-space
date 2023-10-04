import { Fragment, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import {
  Header,
  UserInfo,
  SubCategoryHeader,
  SubCategoryUser,
} from "../../components/Layout";
import {
  getAllSubCategoriesApi,
  blockUnBlockCategoryApi,
  subCategoryParentApi,
} from "../../store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./../../components/Elements";

import "./SubCategory.css";
import { useNavigate } from "react-router-dom";

const SubCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actionReducer } = useSelector((state) => state);
  console.log(actionReducer, "actionReduceractionReducer");

  //   const navigate = useNavigate();

  const [isHome, setIsHome] = useState(false);

  // state for main sub category Information
  const [subCategoryInformation, setSubCategoryInformation] = useState([]);
  console.log(
    subCategoryInformation,
    "subCategoryInformationsubCategoryInformation"
  );

  //state for subCategory BlockUnBlockCategory
  const [blockUnblock, setBlockUnblock] = useState({
    UserID: {
      value: "PLU_1",
      errorMessage: "",
      errorStatus: false,
    },

    Latitude: {
      value: "24.152",
      errorMessage: "",
      errorStatus: false,
    },

    Longitude: {
      value: "24.152",
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
  const [showLoader, setShowLoader] = useState(false);
  let CategoryId = localStorage.getItem("CGID");
  const [showMessage, setShowMessage] = useState(false);
  const [entertainmentMessage, setEntertainmentMessage] = useState(false);
  const [switchBlockAll, setSwitchBlockAll] = useState(false);
  const [switchEntertainment, setSwitchEntertainment] = useState(false);

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
  // Function to toggle the switch
  // const handleBlockAllChange = (checked) => {
  //   console.log(checked, "checkedcheckedchecked");
  //   setSwitchBlockAll(!switchBlockAll);
  //   if (checked) {
  //     let newIds = [];
  //     if (subCategoryInformation.length > 0) {
  //       subCategoryInformation.map((data, index) => {
  //         newIds.push(data.categoryID);
  //       });
  //     }
  //     console.log(newIds, "newIdsnewIds");
  //   } else {
  //     let newIds = [];
  //     console.log(newIds, "newIdsnewIds");
  //   }
  //   let subCategoryUnblock = {
  //     UserID: blockUnblock.UserID.value,
  //     Latitude: blockUnblock.Latitude.value,
  //     Longitude: blockUnblock.Longitude.value,
  //     CategoryWithStatuses: [
  //       {
  //         CategoryID: newIds,
  //         BlockUnBlockCategoryEnum: 1,
  //       },
  //     ],
  //     OtherAvailableListings: [],
  //   };
  //   dispatch(blockUnBlockCategoryApi(subCategoryUnblock));

  //   // setSwitchBlockAll(checked);
  //   // setSwitchEntertainment(checked);
  //   // setShowMessage(true);
  //   // setTimeout(() => {
  //   //   setShowMessage(false);
  //   // }, 1000);
  // };

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
          Latitude: blockUnblock.Latitude.value,
          Longitude: blockUnblock.Longitude.value,
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
          Latitude: blockUnblock.Latitude.value,
          Longitude: blockUnblock.Longitude.value,
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
      Latitude: blockUnblock.Latitude.value,
      Longitude: blockUnblock.Longitude.value,
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

  // useEffect In which I can set the requestData for block and unBlock subCategory
  // useEffect(() => {
  //   let subCategoryUnblock = {
  //     UserID: blockUnblock.UserID.value,
  //     Latitude: blockUnblock.Latitude.value,
  //     Longitude: blockUnblock.Longitude.value,
  //     CategoryWithStatuses: [
  //       {
  //         CategoryID: blockUnblock.CategoryID.value,
  //         BlockUnBlockCategoryEnum: blockUnblock.BlockUnBlockCategoryEnum.value,
  //       },
  //     ],
  //     OtherAvailableListings: blockUnblock.OtherAvailableListings.value,
  //   };
  //   dispatch(blockUnBlockCategoryApi(subCategoryUnblock));
  // }, []);

  // useEffect In which I can set the requestData for subCategroy
  // useEffect(() => {
  //   let subCategory = {
  //     UserID: subCategoryState.userID.value,
  //   };
  //   dispatch(getAllSubCategoriesApi(subCategory));
  // }, []);
  console.log(actionReducer, "actionReduceractionReducer");
  // useEffect for getting data from reducers
  useEffect(() => {
    if (
      actionReducer.getParentCategory !== null &&
      actionReducer.getParentCategory !== undefined &&
      actionReducer.getParentCategory.length > 0
    ) {
      setSubCategoryInformation(actionReducer.getParentCategory);
    }
  }, [actionReducer.getParentCategory]);

  useEffect(() => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }, []);

  //   const onClickExplore = () => {
  //     navigate("/");
  //     setIsHome(true);
  //   };

  return (
    <Fragment>
      <Row>
        <Col>
          {isHome ? (
            <>
              <Header />
              <UserInfo />
            </>
          ) : (
            <>
              <div className="Sub-Categories-header">
                <Container>
                  <SubCategoryHeader />
                  <SubCategoryUser />
                </Container>
              </div>
            </>
          )}
        </Col>
      </Row>
      <Container>
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
                    <>
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
                    </>
                  );
                })
              : null}
          </Col>
        </Row>
        {showLoader && (
          <div className="loader-overlay">
            <Loader />
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default SubCategories;
