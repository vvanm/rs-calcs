import request from "api";

import * as actions from "./actions";

function lookupRsn(rsn) {
  return dispatch => {
    request({
      url: `lookup/${rsn}`
    }).then(({ status, data }) => {
      if (status === 200) {
        dispatch(actions.lookupRsnOk(data));
      }
    });
  };
}

export { lookupRsn };
