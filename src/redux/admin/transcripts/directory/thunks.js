import request from "api";

import * as actions from "./actions";

function search(action) {
  return dispatch => {
    request({
      url: "transcripts?admin=true"
    }).then(({ status, data }) => {
      if (status === 200) {
        dispatch(actions.searchOk(data));
      } else {
      }
    });
  };
}

export { search };
