import React from "react";

import { Card, Row, Col, Form, Img } from "components";

export default props => {
  return (
    <Card title="Banked xp">
      <Row>
        <Col span={12}>
          {props.log_types.map(log => {
            return (
              <Form.Block lSize={8} key={log.id} label={<Img id={log.id} />}>
                <Form.InputNumber onChange={props.updateConf} name={log.id} value={props[log.id]} />
              </Form.Block>
            );
          })}
        </Col>
        <Col span={12}>
          {props.plank_types.map(plank => {
            return (
              <Form.Block lSize={8} key={plank.id} label={<Img id={plank.id} />}>
                <Form.InputNumber onChange={props.updateConf} name={plank.id} value={props[plank.id]} />
              </Form.Block>
            );
          })}
        </Col>
      </Row>
      <Row>
        {props.bone_types.map(bone => {
          return (
            <Col key={bone.id} span={12}>
              <Form.Block lSize={8} label={<Img id={bone.id} />}>
                <Form.InputNumber onChange={props.updateConf} name={bone.id} value={props[bone.id]} />
              </Form.Block>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};
