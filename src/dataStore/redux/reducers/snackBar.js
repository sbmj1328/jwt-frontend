import { Constants } from "../../utlis/Constants";

const initState = {
  show: false,
  severity: "success",
  message: "Hi World",
};

export const showSnack = (state = initState, action) => {
  // console.log("my snack data ",action);
  switch (action.type) {
    case Constants.SNACK:
      return {
        ...state,
        show: true,
        severity: action.payload.severity,
        message: action.payload.message,
      };

    case Constants.SNACK_CLOSE:
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
};
