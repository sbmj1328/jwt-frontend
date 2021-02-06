import { say, pass, passField } from "../../utlis/actions";
import { MyAxios } from "../../utlis/myAxios";
import { Constants } from "../../utlis/Constants";

export const homeAction = (token) => async (dispatch) => {
  dispatch(say(Constants.GET_ALL_USERS_LOADING));
  try {
    const response = await MyAxios.get("home");
    if (response.status === 200) {
      dispatch(pass(Constants.GET_ALL_USERS, response.data));
    } else {
      dispatch(pass(Constants.GET_ALL_USERS_ERROR, "Error"));
    }
  } catch (err) {
    console.log("GET_ALL_USERS error", err);
    dispatch(pass(Constants.GET_ALL_USERS_ERROR, err?.message));
  }
};
