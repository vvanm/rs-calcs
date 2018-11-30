import request from "api";

import * as actions from "./actions";

function search(action) {
  return dispatch => {
    const { keywords } = action;

    let queryParams = new URLSearchParams();

    //add keywords
    if (keywords.length > 0) {
      queryParams.append("keywords", keywords);
    }

    request({
      url: "/transcripts",
      params: queryParams
    }).then(({ status, data }) => {
      if (status === 200) {
        dispatch(actions.searchOk(data));
      }
    });
  };
}

export { search };
