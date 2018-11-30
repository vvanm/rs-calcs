import React from "react";

import { Card, Row, Col, Form } from "components";

export default props => {
  return (
    <Card title="Settings">
      <Row>
        <Col span={13}>
          <Form.Select onChange={props.updateConf} value={props.plankMakingMethod} name="plankMakingMethod" options={props.plankMakingMethods} />
        </Col>
        <Col span={11}>{props.plankMakingMethod === 2 && <Form.Select onChange={props.updateConf} value={props.plankMakingServant} name="plankMakingServant" options={props.plankMakingServants} />}</Col>
      </Row>
      <Col span={24}>
        <Form.Block noLayout>
          <Form.Select onChange={props.updateConf} value={props.plankMakingTeakItem} name="plankMakingTeakItem" options={props.teakItems} />
        </Form.Block>
      </Col>
    </Card>
  );
};
