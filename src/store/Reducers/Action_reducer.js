import * as actions from "../ActionTypes";

const initialState = {
  ResponseMessage: "",
  Loading: false,
  dashBoardListings: [],
  subCategoryDashboardListing: [],
  favoriteListing: [],
  getAllCategoriesUser: [],
  getAllSubCategories: [],
  updateFavoriteList: "",
  blockUnBlockCategory: "",
  getParentCategory: [],
  likeUnlikeBusiness: "",
  searchListing: [],
  searchListingCategory: [],
  filterData: null,
  businessListing: "",
  locationLongitude: "",
  locationLatitude: "",
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

    case actions.FAVORITE_BY_USER_SUCCESS: {
      return {
        ...state,
        Loading: false,
        favoriteListing: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.FAVORITE_BY_USER_FAIL: {
      return {
        ...state,
        Loading: false,
        favoriteListing: [],
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
      return {
        ...state,
        Loading: false,
        blockUnBlockCategory: action.response,
        ResponseMessage: action.message,
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
      return {
        ...state,
        Loading: false,
        likeUnlikeBusiness: action.response,
        ResponseMessage: action.message,
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

    case actions.BUSINESS_DETAIL_FAIL: {
      return {
        ...state,
        Loading: false,
        businessListing: "",
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
