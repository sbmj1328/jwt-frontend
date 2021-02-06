import { say, pass } from "../../utlis/actions";
import { MyAxios } from "../../utlis/myAxios";
import { Constants } from "../../utlis/Constants";

export const registerAction = (data, onTheSuccess) => async (dispatch) => {
  dispatch(say(Constants.REGISTER_LOADING));
  try {
    const response = await MyAxios.post("users/register", data);
    console.log("my res logs", response.status === 201);
    if (response.status === 201) {
      dispatch(pass(Constants.REGISTER, response.data));
      onTheSuccess();
    } else {
      dispatch(pass(Constants.REGISTER_ERROR, "Error"));
      dispatch(
        pass(Constants.SNACK, {
          severity: Constants.SNACK_ERROR,
          message: "Failed to Register",
        })
      );
    }
  } catch (err) {
    console.log("REGISTER error", err);
    dispatch(pass(Constants.REGISTER_ERROR, err?.message));
    dispatch(
      pass(Constants.SNACK, {
        severity: Constants.SNACK_ERROR,
        message: "Failed to Register",
      })
    );
  }
};
