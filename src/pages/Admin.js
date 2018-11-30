import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import Transcripts from "./admin/Transcripts";

const Admin = props => {
  if (props.userType !== "admin") {
    return "No access";
  }

  return (
    <>
      <Route path="/admin/transcripts" component={Transcripts} />
    </>
  );
};

const mapStateToProps = state => ({
  userType: state.user.userType
});

export default connect(
  mapStateToProps,
  null
)(Admin);
