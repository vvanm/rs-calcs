import request from "api";

import * as actions from "./actions";

function getGePricesForCategory(category) {
  return dispatch => {
    request({
      url: "/prices/" + category
    }).then(({ status, data }) => {
      if (status === 200) {
        dispatch(actions.setGePricesForCategory(category, data));
      }
    });
  };
}

export { getGePricesForCategory };
