import { say, pass } from "../../utlis/actions";
import { MyAxios } from "../../utlis/myAxios";
import { Constants } from "../../utlis/Constants";

export const header = (token) => {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "*/*",
  };
};

export const homeAction = (token) => async (dispatch) => {
  dispatch(say(Constants.GET_ALL_USERS_LOADING));
  try {
    MyAxios.defaults.headers = header(token);
    const response = await MyAxios.get("users");
    if (response.status === 200) {
      dispatch(pass(Constants.GET_ALL_USERS, response.data));
    } else {
      dispatch(pass(Constants.GET_ALL_USERS_ERROR, "Error"));
      dispatch(
        pass(Constants.SNACK, {
          severity: Constants.SNACK_ERROR,
          message: "Failed",
        })
      );
    }
  } catch (err) {
    console.log("GET_ALL_USERS error", err);
    dispatch(pass(Constants.GET_ALL_USERS_ERROR, err?.message));
    dispatch(
      pass(Constants.SNACK, {
        severity: Constants.SNACK_ERROR,
        message: "Failed",
      })
    );
  }
};
