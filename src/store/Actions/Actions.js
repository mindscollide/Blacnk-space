import * as actions from "../ActionTypes";
import axios from "axios";
import {
  getDashboardDataApi,
  authRefreshToken,
  exploreCategoryApi,
  favoriteUserApi,
  getAllCategoriesUserApi,
  getAllSubCategoriesUserApi,
  updateFavoritesUser,
  blockUnblockApi,
  getAllSubCategoryParent,
  likeUnlikeBusinessApi,
  searchBlancspace,
  businessDetailApi,
} from "../../common/Apis/Api_Config";
import { authenticationAPI } from "../../common/Apis/Api_End_Points";

// Refresh Token success
const refreshTokenSuccess = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_SUCCESS,
    response: response,
    message: message,
  };
};

// Refresh Token Fail
const refreshTokenFail = (message) => {
  return {
    type: actions.REFRESH_TOKEN_FAIL,
    message: message,
  };
};

// Refresh Token API

const refreshTokenApi = () => {
  let Token = JSON.parse(localStorage.getItem("token"));
  // let RefreshToken = JSON.parse(localStorage.getItem("refreshToken"));

  console.log("Token", Token);
  let Data = {
    _token: Token,
  };
  console.log("Token", Data);
  return async (dispatch) => {
    let form = new FormData();
    form.append("RequestMethod", authRefreshToken.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        console.log("Token", response);
        if (response.data.responseCode === 200) {
          await dispatch(
            refreshTokenSuccess(
              response.data.responseResult,
              "Refresh Token Update Successfully"
            )
          );
        } else {
          console.log("RefreshToken", response);
          await dispatch(
            refreshTokenFail("Your Session has expired. Please login again.")
          );
        }
      })
      .catch((response) => {
        dispatch(
          refreshTokenFail("Your Session has expired. Please login again.")
        );
      });
  };
};

//Init of getDashboardData API

const getDashboardInit = () => {
  return {
    type: actions.GET_DASHBOARD_DATA_INIT,
  };
};

//Success of getDashboardData API
const getDashboardSuccess = (response, message) => {
  return {
    type: actions.GET_DASHBOARD_DATA_SUCCESS,
    response: response,
    message: message,
  };
};

//Fail of getDashboardData API
const getDashboardFail = (message) => {
  return {
    type: actions.GET_DASHBOARD_DATA_FAIL,
    message: message,
  };
};

// get Dashboard Data Api
const getdashboardApi = (Data, seLoadingAuto) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(getDashboardInit());
    let form = new FormData();
    form.append("RequestMethod", getDashboardDataApi.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("catergory Wise DashBoard Listings", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(getdashboardApi(Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_GetDashBoardData_01".toLowerCase()
            ) {
              console.log(
                "catergory Wise DashBoard Listings",
                response.data.responseResult.catergoryWiseDashBoardListings
              );
              dispatch(
                getDashboardSuccess(
                  response.data.responseResult.catergoryWiseDashBoardListings,
                  "Data has been returned successfully."
                )
              );
              seLoadingAuto(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetDashBoardData_02".toLowerCase()
                )
            ) {
              dispatch(getDashboardFail("Could not find the data"));
              seLoadingAuto(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetDashBoardData_03".toLowerCase()
                )
            ) {
              dispatch(
                getDashboardFail("Provided userid was either null or empty")
              );
              seLoadingAuto(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetDashBoardData_04".toLowerCase()
                )
            ) {
              dispatch(getDashboardFail("Exception Something went wrong"));
              seLoadingAuto(false);
            }
          } else {
            dispatch(getDashboardFail("Something went wrong"));
            seLoadingAuto(false);

            console.log("Exception Something went wrong");
          }
        } else {
          dispatch(getDashboardFail("Something went wrong"));
          seLoadingAuto(false);

          console.log("Exception Something went wrong");
        }
      })
      .catch((response) => {
        dispatch(getDashboardFail("something went wrong"));
        seLoadingAuto(false);
      });
  };
};

//init of explore Category Api
const exploreCategoryInit = () => {
  return {
    type: actions.EXPLORE_CATEGORY_INIT,
  };
};

// Success of explore Category Api
const exploreCategorySuccess = (response, message) => {
  return {
    type: actions.EXPLORE_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

//Fail of explore Category Api
const exploreCategoryFail = (message) => {
  return {
    type: actions.EXPLORE_CATEGORY_FAIL,
    message: message,
  };
};

// Explore Categroy Api
const exploreCategory = (exploreNewData, seLoadingAuto) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(exploreCategoryInit());
    let form = new FormData();
    form.append("RequestMethod", exploreCategoryApi.RequestMethod);
    form.append("RequestData", JSON.stringify(exploreNewData));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("explore Category Api", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(exploreCategory(exploreNewData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_ExploreCategory_01".toLowerCase()
            ) {
              console.log(
                "Explore Category Api",
                response.data.responseResult.subCatergoryWiseDashBoardListings
              );
              dispatch(
                exploreCategorySuccess(
                  response.data.responseResult
                    .subCatergoryWiseDashBoardListings,
                  "Data has been returned successfully"
                )
              );
              seLoadingAuto(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_ExploreCategory_02".toLowerCase()
                )
            ) {
              dispatch(exploreCategoryFail("Could not find the data"));
              seLoadingAuto(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_ExploreCategory_03".toLowerCase()
                )
            ) {
              dispatch(
                exploreCategoryFail("Provided userid was either null or empty")
              );
              seLoadingAuto(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_ExploreCategory_04".toLowerCase()
                )
            ) {
              dispatch(exploreCategoryFail("Exception Something went wrong"));
              seLoadingAuto(false);
            }
          } else {
            dispatch(exploreCategoryFail("Something went wrong"));
            console.log("Exception Something went wrong");
            seLoadingAuto(false);
          }
        } else {
          dispatch(exploreCategoryFail("Something went wrong"));
          console.log("Exception Something went wrong");
          seLoadingAuto(false);
        }
      })
      .catch((response) => {
        seLoadingAuto(false);
        dispatch(exploreCategoryFail("something went wrong"));
      });
  };
};

// favorite By User Init
const favoriteUserInit = () => {
  return {
    type: actions.FAVORITE_BY_USER_INIT,
  };
};

// favorite By User Success
const favoriteUserSuccess = (response, message) => {
  return {
    type: actions.FAVORITE_BY_USER_SUCCESS,
    response: response,
    message: message,
  };
};

// favorite By User Fail
const favoriteUserFail = (message) => {
  return {
    type: actions.FAVORITE_BY_USER_FAIL,
    message: message,
  };
};

// Favorite By User Api
const favoriteByUserApi = (favoriteNewData) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(favoriteUserInit());
    let form = new FormData();
    form.append("RequestMethod", favoriteUserApi.RequestMethod);
    form.append("RequestData", JSON.stringify(favoriteNewData));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("explore Category Api", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(favoriteByUserApi(favoriteNewData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_FavoriteByUser_01".toLowerCase()
            ) {
              console.log(
                "Explore Category Api",
                response.data.responseResult.responseMessage
              );
              dispatch(
                favoriteUserSuccess(
                  response.data.responseResult
                    .categoryWiseFavoriteByUserListings,
                  "Data has been returned successfully"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_FavoriteByUser_02".toLowerCase()
                )
            ) {
              dispatch(favoriteUserFail("Could not find the data"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_FavoriteByUser_03".toLowerCase()
                )
            ) {
              dispatch(
                favoriteUserFail("Provided userid was either null or empty")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_FavoriteByUser_04".toLowerCase()
                )
            ) {
              dispatch(favoriteUserFail("Exception Something went wrong"));
            }
          } else {
            dispatch(favoriteUserFail("Something went wrong"));
            console.log("Exception Something went wrong");
          }
        } else {
          dispatch(favoriteUserFail("Something went wrong"));
          console.log("Exception Something went wrong");
        }
      })
      .catch((response) => {
        dispatch(favoriteUserFail("something went wrong"));
      });
  };
};

// get All Categories For User Init
const getAllCategoriesInit = () => {
  return {
    type: actions.GET_ALL_CATEGORIES_USER_INIT,
  };
};

// get All Categories For User Success
const getAllCategoriesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CATEGORIES_USER_SUCCESS,
    response: response,
    message: message,
  };
};

// get All Categories For User Fail
const getAllCategoriesFail = (message) => {
  return {
    type: actions.GET_ALL_CATEGORIES_USER_FAIL,
    message: message,
  };
};

//get All Categories For User Api
const getAllCategoriesApi = (mainCategories) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(getAllCategoriesInit());
    let form = new FormData();
    form.append("RequestMethod", getAllCategoriesUserApi.RequestMethod);
    form.append("RequestData", JSON.stringify(mainCategories));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("explore Category Api", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(getAllCategoriesApi(mainCategories));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_GetAllCategoriesForUser_01".toLowerCase()
            ) {
              console.log(
                "Explore Category Api",
                response.data.responseResult.responseMessage
              );
              dispatch(
                getAllCategoriesSuccess(
                  response.data.responseResult.categoriesForUsers,
                  "Data has been returned successfully"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetAllCategoriesForUser_02".toLowerCase()
                )
            ) {
              dispatch(getAllCategoriesFail("Could not find the data"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetAllCategoriesForUser_03".toLowerCase()
                )
            ) {
              dispatch(
                getAllCategoriesFail("Provided userid was either null or empty")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetAllCategoriesForUser_04".toLowerCase()
                )
            ) {
              dispatch(getAllCategoriesFail("Exception Something went wrong"));
            }
          } else {
            dispatch(getAllCategoriesFail("Something went wrong"));
            console.log("Exception Something went wrong");
          }
        } else {
          dispatch(getAllCategoriesFail("Something went wrong"));
          console.log("Exception Something went wrong");
        }
      })
      .catch((response) => {
        dispatch(getAllCategoriesFail("something went wrong"));
      });
  };
};

//get All Sub Categories For User Init
const getAllSubCategoriesInit = () => {
  return {
    type: actions.GET_ALL_SUB_CATEGORIES_USER_INIT,
  };
};

// get All Sub Categories For User Success
const getAllSubCategoriesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_SUB_CATEGORIES_USER_SUCCESS,
    response: response,
    message: message,
  };
};

// get All Sub Categories For User Fail
const getAllSubCategoriesFail = (message) => {
  return {
    type: actions.GET_ALL_SUB_CATEGORIES_USER_FAIL,
    message: message,
  };
};

//get All Sub Categories For User API
const getAllSubCategoriesApi = (subCategory) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(getAllSubCategoriesInit());
    let form = new FormData();
    form.append("RequestMethod", getAllSubCategoriesUserApi.RequestMethod);
    form.append("RequestData", JSON.stringify(subCategory));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("explore Category Api", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(getAllSubCategoriesApi(subCategory));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_GetAllSubCategoriesForUser_01".toLowerCase()
            ) {
              console.log(
                "Explore Category Api",
                response.data.responseResult.responseMessage
              );
              dispatch(
                getAllSubCategoriesSuccess(
                  response.data.responseResult.categoriesForUsers,
                  "Data has been returned successfully"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetAllSubCategoriesForUser_02".toLowerCase()
                )
            ) {
              dispatch(getAllSubCategoriesFail("Could not find the data"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetAllSubCategoriesForUser_03".toLowerCase()
                )
            ) {
              dispatch(
                getAllSubCategoriesFail(
                  "Provided userid was either null or empty"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetAllSubCategoriesForUser_04".toLowerCase()
                )
            ) {
              dispatch(
                getAllSubCategoriesFail("Exception Something went wrong")
              );
            }
          } else {
            dispatch(getAllSubCategoriesFail("Something went wrong"));
            console.log("Exception Something went wrong");
          }
        } else {
          dispatch(getAllSubCategoriesFail("Something went wrong"));
          console.log("Exception Something went wrong");
        }
      })
      .catch((response) => {
        dispatch(getAllSubCategoriesFail("something went wrong"));
      });
  };
};

// Update Favorites Init
const updateFavoriteInit = () => {
  return {
    type: actions.UPDATE_FAVORITE_INIT,
  };
};

// Update Favorite Success
const updateFavoriteSuccess = (response, message) => {
  return {
    type: actions.FAVORITE_BY_USER_SUCCESS,
    response: response,
    message: message,
  };
};

// Update Favorite Fail
const updateFavoriteFail = (message) => {
  return {
    type: actions.FAVORITE_BY_USER_FAIL,
    message: message,
  };
};

// Update Favorite Api Func

const updateFavoriteApi = (Data) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(updateFavoriteInit());
    let form = new FormData();
    form.append("RequestMethod", updateFavoritesUser.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("explore Category Api", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(updateFavoriteApi());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_UpdateFavorites_01".toLowerCase()
            ) {
              console.log(
                "Explore Category Api",
                response.data.responseResult.responseMessage
              );
              dispatch(
                updateFavoriteSuccess(
                  response.data.responseResult.categoriesForUsers,
                  "Updated successfully"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_UpdateFavorites_02".toLowerCase()
                )
            ) {
              dispatch(
                updateFavoriteFail("Provided userid was either null or empty")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_UpdateFavorites_03".toLowerCase()
                )
            ) {
              dispatch(updateFavoriteFail("Exception Something went wrong"));
            }
          } else {
            dispatch(updateFavoriteFail("Something went wrong"));
            console.log("Exception Something went wrong");
          }
        } else {
          dispatch(updateFavoriteFail("Something went wrong"));
          console.log("Exception Something went wrong");
        }
      })
      .catch((response) => {
        dispatch(updateFavoriteFail("something went wrong"));
      });
  };
};

// block un block category Init
const blockUnBlockInit = () => {
  return {
    type: actions.BLOCK_UN_BLOCK_INIT,
  };
};

//block unBlock category Success
const blockUnBlockSuccess = (response, message) => {
  return {
    type: actions.BLOCK_UN_BLOCK_SUCCESS,
    response: response,
    message: message,
  };
};

//block unBlock category Fail
const blockUnBlockFail = (message) => {
  return {
    type: actions.BLOCK_UN_BLOCK_FAIL,
    message: message,
  };
};

//block unBlock category Api
const blockUnBlockCategoryApi = (
  subCategoryUnblock,
  navigate,
  newHandlerClick,
  no
) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(blockUnBlockInit());
    let form = new FormData();
    form.append("RequestMethod", blockUnblockApi.RequestMethod);
    form.append("RequestData", JSON.stringify(subCategoryUnblock));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("explore Category Api", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(
            blockUnBlockCategoryApi(
              subCategoryUnblock,
              navigate,
              newHandlerClick,
              no
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_BlockUnBlockCategory_01".toLowerCase()
            ) {
              console.log(
                "Explore Category Api",
                response.data.responseResult.responseMessage
              );
              await dispatch(
                blockUnBlockSuccess(
                  response.data.responseResult.categoriesForUsers,
                  "Updated successfully"
                )
              );
              if (no === 1) {
                dispatch(getAllCategoriesApi(newHandlerClick));
              } else {
                dispatch(subCategoryParentApi(navigate, newHandlerClick));
              }
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_BlockUnBlockCategory_02".toLowerCase()
                )
            ) {
              dispatch(
                blockUnBlockFail("Provided userid was either null or empty")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_BlockUnBlockCategory_03".toLowerCase()
                )
            ) {
              dispatch(blockUnBlockFail("Exception Something went wrong"));
            }
          } else {
            dispatch(blockUnBlockFail("Something went wrong"));
            console.log("Exception Something went wrong");
          }
        } else {
          dispatch(blockUnBlockFail("Something went wrong"));
          console.log("Exception Something went wrong");
        }
      })
      .catch((response) => {
        dispatch(blockUnBlockFail("something went wrong"));
      });
  };
};

//Get All Sub Category Parent Init
const subCategoryParentInit = () => {
  return {
    type: actions.GET_ALL_SUB_CATEGORY_PARENT_INIT,
  };
};

//Get All Sub Category Parent Success
const subCategoryParentSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_SUB_CATEGORY_PARENT_SUCCESS,
    response: response,
    message: message,
  };
};

//Get All Sub Category Parent Fail
const subCategoryParentFail = (message) => {
  return {
    type: actions.GET_ALL_SUB_CATEGORY_PARENT_FAIL,
    message: message,
  };
};

//Get All Sub Category Parent Main API
const subCategoryParentApi = (navigate, newHandlerClick) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(subCategoryParentInit());
    let form = new FormData();
    form.append("RequestMethod", getAllSubCategoryParent.RequestMethod);
    form.append("RequestData", JSON.stringify(newHandlerClick));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("explore Category Api", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(subCategoryParentApi(newHandlerClick));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_GetAllSubCategoriesForUserByParentCategoryID_01".toLowerCase()
            ) {
              console.log(
                "Explore Category Api",
                response.data.responseResult.responseMessage
              );
              await dispatch(
                subCategoryParentSuccess(
                  response.data.responseResult.categoriesForUsers,
                  "Updated successfully"
                )
              );
              localStorage.setItem("CGID", newHandlerClick.CategoryID);
              navigate("/BlankSpace/SubCategories");
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetAllSubCategoriesForUserByParentCategoryID_02".toLowerCase()
                )
            ) {
              dispatch(
                subCategoryParentFail(
                  "Provided userid was either null or empty"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetAllSubCategoriesForUserByParentCategoryID_03".toLowerCase()
                )
            ) {
              dispatch(subCategoryParentFail("Exception Something went wrong"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_GetAllSubCategoriesForUserByParentCategoryID_04".toLowerCase()
                )
            ) {
              dispatch(subCategoryParentFail("Exception Something went wrong"));
            }
          } else {
            dispatch(subCategoryParentFail("Something went wrong"));
            console.log("Exception Something went wrong");
          }
        } else {
          dispatch(subCategoryParentFail("Something went wrong"));
          console.log("Exception Something went wrong");
        }
      })
      .catch((response) => {
        dispatch(subCategoryParentFail("something went wrong"));
      });
  };
};

// Like un like business Init
const likeUnlikeInit = () => {
  return {
    type: actions.LIKE_UNLIKE_BUSINESS_INIT,
  };
};

// Like un like business Success
const likeUnlikeSuccess = (response, message) => {
  return {
    type: actions.LIKE_UNLIKE_BUSINESS_SUCCESS,
    response: response,
    message: message,
  };
};

// Like un like business Fail
const likeUnlikeFail = (message) => {
  return {
    type: actions.LIKE_UNLIKE_BUSINESS_FAIL,
    message: message,
  };
};

// Like un like business Main API
const likeUnlikeApi = (newLike) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(likeUnlikeInit());
    let form = new FormData();
    form.append("RequestMethod", likeUnlikeBusinessApi.RequestMethod);
    form.append("RequestData", JSON.stringify(newLike));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("explore Category Api", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(likeUnlikeApi(newLike));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_LikeUnLikeBusinessListings_01".toLowerCase()
            ) {
              console.log(
                "Explore Category Api",
                response.data.responseResult.responseMessage
              );
              dispatch(
                likeUnlikeSuccess(
                  response.data.responseResult.responseMessage,
                  "Updated successfully"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_LikeUnLikeBusinessListings_02".toLowerCase()
                )
            ) {
              dispatch(
                likeUnlikeFail("Provided userid was either null or empty")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_LikeUnLikeBusinessListings_03".toLowerCase()
                )
            ) {
              dispatch(likeUnlikeFail("Exception Something went wrong"));
            }
          } else {
            dispatch(likeUnlikeFail("Something went wrong"));
            console.log("Exception Something went wrong");
          }
        } else {
          dispatch(likeUnlikeFail("Something went wrong"));
          console.log("Exception Something went wrong");
        }
      })
      .catch((response) => {
        dispatch(likeUnlikeFail("something went wrong"));
      });
  };
};

// For blancspace Search Init
const searchInit = () => {
  return {
    type: actions.SEARCH_BLANCSPACE_INIT,
  };
};

// For blancspace Search Success
const searchSuccess = (response, response2, message) => {
  return {
    type: actions.SEARCH_BLANCSPACE_SUCCESS,
    response: response,
    response2: response2,
    message: message,
  };
};

// For blancspace Search Fail
const searchFail = (message) => {
  return {
    type: actions.SEARCH_BLANCSPACE_FAIL,
    message: message,
  };
};

// For blancspace Search Main API
const searchBlancApi = (navigate, searchUser, newSearchData, newSearch) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(searchInit());
    let form = new FormData();
    form.append("RequestMethod", searchBlancspace.RequestMethod);
    form.append("RequestData", JSON.stringify(searchUser, newSearchData));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("explore Category Api", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(
            searchBlancApi(navigate, searchUser, newSearchData, newSearch)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_Search_01".toLowerCase()
            ) {
              console.log(
                "Explore Category Api",
                response.data.responseResult.responseMessage
              );
              dispatch(
                searchSuccess(
                  response.data.responseResult.listing,
                  response.data.responseResult.listCategories,
                  "Updated successfully"
                )
              );
              console.log(searchSuccess, "SearchSuccessssss");
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("BlancSpace_AUTH_AuthManager_Search_02".toLowerCase())
            ) {
              dispatch(searchFail("Provided userid was either null or empty"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("BlancSpace_AUTH_AuthManager_Search_03".toLowerCase())
            ) {
              dispatch(searchFail("Exception Something went wrong"));
            }
          } else {
            dispatch(searchFail("Something went wrong"));
            console.log("Exception Something went wrong");
          }
        } else {
          dispatch(searchFail("Something went wrong"));
          console.log("Exception Something went wrong");
        }
      })
      .catch((response) => {
        dispatch(searchFail("something went wrong"));
      });
  };
};

const LoaderFunc = (payload) => {
  return {
    type: actions.LOADER,
    response: payload,
  };
};

const filterData = (response) => {
  return {
    type: actions.FILTER_DATA,
    payload: response,
  };
};

//Location data for longitude
const longitudeData = (response) => {
  return {
    type: actions.LONGITUTDE_LOCATION_DATA,
    payload: response,
  };
};

//Location data for latitude
const latitudeData = (response) => {
  return {
    type: actions.LATITUDE_LOCATION_DATA,
    payload: response,
  };
};

// FOR businessDetails Init
const businessDetailsInit = () => {
  return {
    type: actions.BUSINESS_DETAIL_INIT,
  };
};

// FOR businessDetails Success
const businessDetailsSuccess = (response, message) => {
  return {
    type: actions.BUSINESS_DETAIL_SUCCESS,
    response: response,
    message: message,
  };
};

// FOR businessDetails Success
const businessDetailsFail = (message) => {
  return {
    type: actions.BUSINESS_DETAIL_FAIL,
    message: message,
  };
};

//FOR businessDeatils Main API
const businessDetailsMainApi = (navigate, newBusinessIdData) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(businessDetailsInit());
    let form = new FormData();
    form.append("RequestMethod", businessDetailApi.RequestMethod);
    form.append("RequestData", JSON.stringify(newBusinessIdData));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: Token,
      },
    })
      .then(async (response) => {
        console.log("explore Category Api", response);
        if (response.data.responseCode === 417) {
          await dispatch(refreshTokenApi());
          dispatch(businessDetailsMainApi(newBusinessIdData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "BlancSpace_AUTH_AuthManager_BusinessListingByBusinessListingID_01".toLowerCase()
            ) {
              console.log(
                "Explore Category Api",
                response.data.responseResult.responseMessage
              );
              dispatch(
                businessDetailsSuccess(
                  response.data.responseResult.businessListing,
                  "Updated successfully"
                )
              );
              navigate("/BlankSpace/Category");
              console.log(businessDetailsSuccess, "SearchSuccessssss");
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_BusinessListingByBusinessListingID_02".toLowerCase()
                )
            ) {
              dispatch(
                businessDetailsFail("Provided userid was either null or empty")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "BlancSpace_AUTH_AuthManager_BusinessListingByBusinessListingID_03".toLowerCase()
                )
            ) {
              dispatch(businessDetailsFail("Exception Something went wrong"));
            }
          } else {
            dispatch(businessDetailsFail("Something went wrong"));
            console.log("Exception Something went wrong");
          }
        } else {
          dispatch(businessDetailsFail("Something went wrong"));
          console.log("Exception Something went wrong");
        }
      })
      .catch((response) => {
        dispatch(businessDetailsFail("something went wrong"));
      });
  };
};

export {
  getdashboardApi,
  refreshTokenApi,
  exploreCategory,
  favoriteByUserApi,
  getAllCategoriesApi,
  getAllSubCategoriesApi,
  updateFavoriteApi,
  blockUnBlockCategoryApi,
  subCategoryParentApi,
  likeUnlikeApi,
  searchBlancApi,
  filterData,
  businessDetailsMainApi,
  longitudeData,
  latitudeData,
};
