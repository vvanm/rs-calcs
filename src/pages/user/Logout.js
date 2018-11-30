import React from "react";
import { connect } from "react-redux";

import { Card, Button } from "components";

import { thunks } from "redux/user";

const Logout = props => {
  return (
    <Card title="Logout">
      <Button onClick={props.logout}>Logout</Button>
    </Card>
  );
};

export default connect(
  null,
  { logout: thunks.logout }
)(Logout);
