import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";

import { Form, Card, Icon, Button, Alert } from "components";

import { thunks } from "redux/user";

const userIcon = <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />;
const emailIcon = <Icon type="email" style={{ color: "rgba(0,0,0,.25)" }} />;
const passIcon = <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />;

const Register = props => {
  return (
    <Card title="Sign up">
      <Formik
        onSubmit={props.register}
        initialValues={{
          name: "Starlord",
          email: "vanmulders1992@gmail.com",
          password: "test",
          repeatPassword: "test"
        }}
        render={({ values, handleSubmit, handleChange, isSubmitting, status }) => (
          <Form onSubmit={handleSubmit}>
            {status !== undefined && <Alert type="error" message={status.errorMsg} />}
            <Form.Block noLayout>
              <Form.Input name="name" onChange={handleChange} value={values.name} prefix={userIcon} placeholder="Username" />
            </Form.Block>
            <Form.Block noLayout>
              <Form.Input name="email" onChange={handleChange} value={values.email} prefix={emailIcon} placeholder="Email" />
            </Form.Block>
            <Form.Block noLayout>
              <Form.Input name="password" onChange={handleChange} type="password" value={values.password} prefix={passIcon} placeholder="Password" />
            </Form.Block>
            <Form.Block noLayout>
              <Form.Input name="repeatPassword" onChange={handleChange} type="password" value={values.repeatPassword} prefix={passIcon} placeholder="Repeat password" />
            </Form.Block>
            <Button loading={isSubmitting} style={{ width: "100%" }} type="primary" htmlType="submit">
              Register a new account
            </Button>
          </Form>
        )}
      />
    </Card>
  );
};

export default connect(
  null,
  { register: thunks.register }
)(Register);
