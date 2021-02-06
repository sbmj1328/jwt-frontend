import { Constants } from "../../utlis/Constants";

const initState = {
  isLoading: false,
  hasData: false,
  hasError: false,
  data: null,
  error: null,
};

export const registerReducer = (state = initState, action) => {
  switch (action.type) {
    case Constants.REGISTER_LOADING:
      return {
        isLoading: true,
        hasData: false,
        hasError: false,
        data: null,
        error: null,
      };

    case Constants.REGISTER:
      return {
        ...state,
        isLoading: false,
        hasData: true,
        data: action.payload,
      };

    case Constants.REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };

    default:
      return state;
  }
};