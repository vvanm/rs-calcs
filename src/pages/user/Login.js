import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";

import { Form, Card, Icon, Button, Alert } from "components";

import { thunks } from "redux/user";

const userIcon = <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />;
const passIcon = <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />;

const Login = props => {
  return (
    <Card title="Sign in">
      <Formik
        onSubmit={props.login}
        initialValues={{
          name: "",
          password: ""
        }}
        render={({ values, status, isSubmitting, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            {status !== undefined && <Alert type="error" message={status.errorMsg} />}
            <Form.Block noLayout>
              <Form.Input name="name" onChange={handleChange} value={values.name} prefix={userIcon} placeholder="Username" />
            </Form.Block>
            <Form.Block noLayout>
              <Form.Input name="password" onChange={handleChange} value={values.password} prefix={passIcon} type="password" placeholder="Password" />
            </Form.Block>
            <Button loading={isSubmitting} style={{ width: "100%" }} type="primary" htmlType="submit">
              Log in
            </Button>
          </Form>
        )}
      />
    </Card>
  );
};

export default connect(
  null,
  { login: thunks.login }
)(Login);
