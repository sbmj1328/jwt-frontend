import { Constants } from "../../utlis/Constants";

const initState = {
  isLoading: false,
  hasData: false,
  hasError: false,
  data: null,
  error: null,
};

export const homeReducer = (state = initState, action) => {
  switch (action.type) {
    case Constants.GET_ALL_USERS_LOADING:
      return {
        isLoading: true,
        hasData: false,
        hasError: false,
        data: null,
        error: null,
      };

    case Constants.GET_ALL_USERS:
      return {
        ...state,
        isLoading: false,
        hasData: true,
        data: action.payload,
      };

    case Constants.GET_ALL_USERS_ERROR:
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