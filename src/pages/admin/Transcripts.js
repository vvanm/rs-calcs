import React from "react";
import { Route } from "react-router-dom";

import Directory from "./transcripts/Directory";
import Transcript from "./transcripts/Transcript";

export default () => {
  return (
    <>
      <Route exact path="/admin/transcripts" component={Directory} />
      <Route path="/admin/transcripts/:_id" component={Transcript} />
    </>
  );
};
