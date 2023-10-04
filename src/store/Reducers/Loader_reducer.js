import * as actions from "../ActionTypes";

const initialState = {
  Loading: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOADER: {
      return {
        ...state,
        Loading: action.response,
      };
    }
    default:
      return { ...state };
  }
};

export default loaderReducer;
