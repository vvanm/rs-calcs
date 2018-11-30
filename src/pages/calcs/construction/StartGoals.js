import React from "react";

import { Card, Row, Col, Form } from "components";
import { shortenN } from "functions";

export default props => {
  return (
    <Card title="Start/goals" extra={props.goalXp !== "" && "To gain: " + shortenN(props.goalXp - props.xp)}>
      <Row>
        <Col span={16}>
          <Form.Block lSize={8} label="Start xp">
            <Form.InputNumber onChange={props.updateConf} name="xp" value={props.xp} />
          </Form.Block>
        </Col>
        <Col span={8}>
          <Form.Block lSize={10} label="Level">
            <Form.InputNumber onChange={props.updateConf} name="level" value={props.level} />
          </Form.Block>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Form.Block lSize={8} label="Goal xp">
            <Form.InputNumber onChange={props.updateConf} name="goalXp" value={props.goalXp} />
          </Form.Block>
        </Col>
        <Col span={8}>
          <Form.Block lSize={10} label="Level">
            <Form.InputNumber onChange={props.updateConf} name="goalLevel" value={props.goalLevel} />
          </Form.Block>
        </Col>
      </Row>
    </Card>
  );
};
