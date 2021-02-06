import { say, pass } from "../../utlis/actions";
import { MyAxios } from "../../utlis/myAxios";
import { Constants } from "../../utlis/Constants";

export const loginAction = (data) => async (dispatch) => {
  console.log("login adatsd", data);
  dispatch(say(Constants.LOGIN_LOADING));

  try {
    const response = await MyAxios.post("users/login", data);
    console.log("qweqr logs", response);
    if (response.status=== 200) {
      dispatch(pass(Constants.LOGIN, response.data));

      dispatch(pass(Constants.USER_DATA, {
        token: response.data.access_token,
        user: response.data.user,
      }));
    } else {
      dispatch(pass(Constants.LOGIN_ERROR, "Error"));
      dispatch(
        pass(Constants.SNACK, {
          severity: Constants.SNACK_ERROR,
          message: "Failed to login",
        })
      );
    }
  } catch (err) {
    console.log("login errors", err?.response?.data);
    dispatch(pass(Constants.LOGIN_ERROR, err));
    dispatch(
      pass(Constants.SNACK, {
        severity: Constants.SNACK_ERROR,
        message: err?.response?.data ? err?.response?.data.error : "Failed to login",
      })
    );
  }
};
