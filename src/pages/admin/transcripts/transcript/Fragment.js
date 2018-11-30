import React from "react";

import { Row, Col, Form, TagsInput, Button } from "components";

const Fragment = props => {
  const { values, index } = props;

  const updateInput = e => {
    update(e.target.name, e.target.value);
  };
  const updateKeywords = keywords => {
    update("keywords", keywords);
  };
  const update = (name, value) => {
    props.update(index !== undefined ? `fragments[${index}].${name}` : `newFragment.${name}`, value);
  };

  const addNewFragment = () => {
    props.arrayHelpers.unshift(props.values);
    props.update("newFragment", {});
  };

  return (
    <>
      <Row>
        <Col span={18}>
          <Form.Block noLayout label="Title/Question">
            <Form.TextArea name="title" autosize={true} onChange={updateInput} value={values.title} />
          </Form.Block>
        </Col>
        {props.logType === "qa" && (
          <Col span={6}>
            <Form.Block noLayout label="Timestamp">
              <Form.Input name="timestamp" onChange={updateInput} value={values.timestamp} />
            </Form.Block>
          </Col>
        )}
      </Row>

      <Form.Block noLayout label="Keywords">
        <TagsInput onChange={updateKeywords} value={values.keywords !== undefined ? values.keywords : []} />
      </Form.Block>

      <Form.Block noLayout label="Info">
        <Form.TextArea autosize={true} name="info" onChange={updateInput} value={values.info} />
      </Form.Block>

      {index === undefined && (
        <Form.Block>
          <Button onClick={addNewFragment}>Add fragment</Button>
        </Form.Block>
      )}
    </>
  );
};

export default Fragment;
