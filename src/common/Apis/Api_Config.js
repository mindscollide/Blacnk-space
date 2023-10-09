// for Refresh Token in Blancspace

const authRefreshToken = {
  RequestMethod: "ServiceManager.RefreshToken",
};

// for blancspace Dashoard get Api

const getDashboardDataApi = {
  RequestMethod: "ServiceManager.GetDashBoardData",
};

//for blancspace ExploreCategory Api

const exploreCategoryApi = {
  RequestMethod: "ServiceManager.ExploreCategory",
};

//for blancspace favorite By User Api

const favoriteUserApi = {
  RequestMethod: "ServiceManager.FavoriteByUser",
};

//for blancspace get All Categories for user

const getAllCategoriesUserApi = {
  RequestMethod: "ServiceManager.GetAllCategoriesForUser",
};

// for blancspace get All Sub Categories for User

const getAllSubCategoriesUserApi = {
  RequestMethod: "ServiceManager.GetAllSubCategoriesForUser",
};

// for blancspace update favorites
const updateFavoritesUser = {
  RequestMethod: "ServiceManager.UpdateFavorites",
};

// for blancspace BlockUnblockCategory
const blockUnblockApi = {
  RequestMethod: "ServiceManager.BlockUnBlockCategory",
};

// For blancspace GetAllSubCategoriesForUserByParentCategoryIDApi
const getAllSubCategoryParent = {
  RequestMethod: "ServiceManager.GetAllSubCategoriesForUserByParentCategoryID",
};

//For blancspace likeunLikeBusinessListings Api
const likeUnlikeBusinessApi = {
  RequestMethod: "ServiceManager.LikeUnLikeBusinessListings",
};

//For blancspace search Api
const searchBlancspace = {
  RequestMethod: "ServiceManager.Search",
};

// FOR Blancspace business Details page API
const businessDetailApi = {
  RequestMethod: "ServiceManager.BusinessListingByBusinessListingID",
};

export {
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
};
