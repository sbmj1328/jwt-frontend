import { Constants } from "../../utlis/Constants";

export const userDataReducer = (state = { token: "", user: null }, action) => {
  switch (action.type) {
    case Constants.USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
