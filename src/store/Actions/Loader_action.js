import * as actions from "../ActionTypes";

const LoaderFunc = (payload) => {
  return {
    type: actions.LOADER,
    response: payload,
  };
};

export { LoaderFunc };
