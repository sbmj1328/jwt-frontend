import { say, pass, passField } from "../../utlis/actions";
import { MyAxios } from "../../utlis/myAxios";
import { Constants } from "../../utlis/Constants";

export const loginAction = (data) => async (dispatch) => {
  dispatch(say(Constants.LOGIN_LOADING));
  try {
    const response = await MyAxios.post("login", data);
    if (response.status === 200) {
      dispatch(pass(Constants.LOGIN, response.data));
    } else {
      dispatch(pass(Constants.LOGIN_ERROR, "Error"));
    }
  } catch (err) {
    console.log("LOGIN error", err);
    dispatch(pass(Constants.LOGIN_ERROR, err?.message));
  }
};
