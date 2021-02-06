import { say, pass } from "../../utlis/actions";
import { Constants } from "../../utlis/Constants";

export const snackBarAction = (payload) => async (dispatch) => {
  dispatch(pass(success(Constants.SNACK), payload));
};
