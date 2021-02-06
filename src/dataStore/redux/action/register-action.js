import { say, pass, passField } from "../../utlis/actions";
import { MyAxios } from "../../utlis/myAxios";
import { Constants } from "../../utlis/Constants";

export const registerAction = (data, onSuccess) => async (dispatch) => {
  dispatch(say(Constants.REGISTER_LOADING));
  try {
    const response = await MyAxios.post("register", data);
    if (response.status === 200) {
      dispatch(pass(Constants.REGISTER, response.data));
      onSuccess();
    } else {
      dispatch(pass(Constants.REGISTER_ERROR, "Error"));
    }
  } catch (err) {
    console.log("REGISTER error", err);
    dispatch(pass(Constants.REGISTER_ERROR, err?.message));
  }
};
