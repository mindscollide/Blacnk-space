import * as actions from "../ActionTypes";

const initialState = {
  ResponseMessage: "",
  Loading: false,
  dashBoardListings: [],
  subCategoryDashboardListing: [],
  favoriteListing: null,
  getAllCategoriesUser: [],
  getAllSubCategories: [],
  updateFavoriteList: "",
  blockUnBlockCategory: null,
  getParentCategory: [],
  likeUnlikeBusiness: null,
  searchListing: [],
  searchListingCategory: [],
  filterData: null,
  businessListing: [],
  locationLongitude: "",
  locationLatitude: "",
  favoriteListings: [],
  LoadingCheck:true,
};

const actionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DASHBOARD_DATA_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }

    case actions.GET_DASHBOARD_DATA_SUCCESS: {
      return {
        ...state,
        Loading: false,
        dashBoardListings: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.GET_DASHBOARD_DATA_FAIL: {
      return {
        ...state,
        Loading: false,
        dashBoardListings: [],
        ResponseMessage: action.message,
      };
    }

    case actions.EXPLORE_CATEGORY_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }

    case actions.EXPLORE_CATEGORY_SUCCESS: {
      return {
        ...state,
        Loading: false,
        subCategoryDashboardListing: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.EXPLORE_CATEGORY_FAIL: {
      return {
        ...state,
        Loading: false,
        subCategoryDashboardListing: [],
        ResponseMessage: action.message,
      };
    }

    case actions.FAVORITE_BY_USER_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }
    case actions.UPDATE_FAVORITE_BY_USER_SUCCESS: {
      console.log(
        "favoriteListing UPDATE_FAVORITE_BY_USER_SUCCESS",
        action.response
      );
      return {
        ...state,
        Loading: false,
        favoriteListing: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.FAVORITE_BY_USER_SUCCESS: {
      return {
        ...state,
        Loading: false,
        favoriteListings: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.CLEARE_FAVORITE_BY_USER_SUCCESS: {
      console.log("favoriteListing CLEARE_FAVORITE_BY_USER_SUCCESS");

      return {
        ...state,
        favoriteListing: null,
        ResponseMessage: "",
      };
    }

    case actions.FAVORITE_BY_USER_FAIL: {
      return {
        ...state,
        Loading: false,
        favoriteListing: null,
        ResponseMessage: action.message,
      };
    }

    case actions.GET_ALL_CATEGORIES_USER_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }

    case actions.GET_ALL_CATEGORIES_USER_SUCCESS: {
      return {
        ...state,
        Loading: false,
        getAllCategoriesUser: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.GET_ALL_CATEGORIES_USER_FAIL: {
      return {
        ...state,
        Loading: false,
        getAllCategoriesUser: [],
        ResponseMessage: action.message,
      };
    }

    case actions.GET_ALL_SUB_CATEGORIES_USER_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }

    case actions.GET_ALL_SUB_CATEGORIES_USER_SUCCESS: {
      return {
        ...state,
        Loading: false,
        getAllSubCategories: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.GET_ALL_SUB_CATEGORIES_USER_FAIL: {
      return {
        ...state,
        Loading: false,
        getAllSubCategories: [],
        ResponseMessage: action.message,
      };
    }

    case actions.UPDATE_FAVORITE_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }

    case actions.UPDATE_FAVORITE_SUCCESS: {
      return {
        ...state,
        Loading: false,
        updateFavoriteList: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.UPDATE_FAVORITE_FAIL: {
      return {
        ...state,
        Loading: false,
        updateFavoriteList: "",
        ResponseMessage: action.message,
      };
    }

    case actions.BLOCK_UN_BLOCK_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }

    case actions.BLOCK_UN_BLOCK_SUCCESS: {
      console.log("block check", action.response);
      return {
        ...state,
        Loading: false,
        blockUnBlockCategory: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.CLEARE_BLOCK_UN_BLOCK_SUCCESS: {
      console.log("block check cleare");
      return {
        ...state,
        blockUnBlockCategory: null,
      };
    }

    case actions.BLOCK_UN_BLOCK_FAIL: {
      return {
        ...state,
        Loading: false,
        blockUnBlockCategory: "",
        ResponseMessage: action.message,
      };
    }

    case actions.GET_ALL_SUB_CATEGORY_PARENT_INIT: {
      return { ...state, Loading: true };
    }

    case actions.GET_ALL_SUB_CATEGORY_PARENT_SUCCESS: {
      return {
        ...state,
        Loading: false,
        getParentCategory: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.GET_ALL_SUB_CATEGORY_PARENT_FAIL: {
      return {
        ...state,
        Loading: false,
        getParentCategory: [],
        ResponseMessage: action.message,
      };
    }

    case actions.LIKE_UNLIKE_BUSINESS_INIT: {
      return { ...state, Loading: true };
    }

    case actions.LIKE_UNLIKE_BUSINESS_SUCCESS: {
      console.log(action.response, "checkedcheckedchecked likeUnlikeSuccess");
      return {
        ...state,
        Loading: false,
        likeUnlikeBusiness: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.CLEARE_LIKE_UNLIKE_BUSINESS_SUCCESS: {
      console.log(
        action.response,
        "checkedcheckedchecked CLEARE_LIKE_UNLIKE_BUSINESS_SUCCESS"
      );
      return {
        ...state,
        likeUnlikeBusiness: null,
        ResponseMessage: "",
      };
    }

    case actions.LIKE_UNLIKE_BUSINESS_FAIL: {
      return {
        ...state,
        Loading: false,
        likeUnlikeBusiness: "",
        ResponseMessage: action.message,
      };
    }

    case actions.SEARCH_BLANCSPACE_INIT: {
      return { ...state, Loading: true };
    }

    case actions.SEARCH_BLANCSPACE_SUCCESS: {
      return {
        ...state,
        Loading: false,
        searchListing: action.response,
        searchListingCategory: action.response2,
        ResponseMessage: action.message,
      };
    }

    case actions.SEARCH_BLANCSPACE_FAIL: {
      return {
        ...state,
        Loading: false,
        searchListing: [],
        searchListingCategory: [],
        ResponseMessage: action.message,
      };
    }

    case actions.BUSINESS_DETAIL_INIT: {
      return { ...state, Loading: true };
    }

    case actions.BUSINESS_DETAIL_SUCCESS: {
      return {
        ...state,
        Loading: false,
        businessListing: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.CATEGORY_ROUTE_LOADER: {
      return {
        ...state,
        LoadingCheck: action.response,
      };
    }
    case actions.BUSINESS_DETAIL_FAIL: {
      return {
        ...state,
        Loading: false,
        businessListing: [],
        ResponseMessage: action.message,
      };
    }

    case actions.FILTER_DATA: {
      return {
        ...state,
        filterData: action.payload,
      };
    }

    case actions.LONGITUTDE_LOCATION_DATA: {
      return {
        ...state,
        locationLongitude: action.payload,
      };
    }

    case actions.LATITUDE_LOCATION_DATA: {
      return {
        ...state,
        locationLatitude: action.payload,
      };
    }

    default:
      return { ...state };
  }
};

export default actionReducer;
