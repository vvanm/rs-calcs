import React from "react";
import { connect } from "react-redux";

import { Row, Col } from "components";

import Login from "./user/Login";
import Register from "./user/Register";
import Logout from "./user/Logout";

const User = props => {
  return (
    <Row>
      <Col xs={24} sm={16} md={8} span={4}>
        {props.isAuth ? (
          <Logout />
        ) : (
          <>
            <Login />
            <Register />
          </>
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  ...state.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
