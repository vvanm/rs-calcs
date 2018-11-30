import React from "react";
import { connect } from "react-redux";

import { Row, Col, Card, Form, Img, Tooltip, Button } from "components";
import { isNumber } from "functions";
import { actions } from "redux/calcs/mta";

const Conf = props => {
  const selectAll = () => {
    props.toggleAllItems(true);
  };
  const deselectAll = () => {
    props.toggleAllItems(false);
  };

  const renderPointStatus = (current, needed) => {
    const v = isNumber(current) - needed;
    return (
      <span>
        <b>{isNumber(current)}</b> / {needed}
        {" ("} <span className={v > -1 ? "pos" : "neg"}>{v}</span> {")"}
      </span>
    );
  };

  //calculate points needed
  const pointsNeeded = props.items
    .filter(item => item.active)
    .reduce(
      (acc, el) => ({
        grav: acc.grav + el.points.grav,
        alch: acc.grav + el.points.alch,
        enchant: acc.enchant + el.points.enchant,
        tele: acc.tele + el.points.tele
      }),
      {
        grav: 0,
        alch: 0,
        enchant: 0,
        tele: 0
      }
    );

  return (
    <Col span={1} style={{ width: 380 }}>
      <Card
        title="Items"
        extra={
          <Button.Group>
            <Button onClick={props.reset}>Reset</Button>
            <Button onClick={props.selectWands}>Wand</Button>
            <Button onClick={selectAll}>All</Button>
            <Button onClick={deselectAll}>None</Button>
          </Button.Group>
        }
      >
        <Row>
          {props.items.map((item, i) => {
            return (
              <Col key={item.id} span={6}>
                <Form.Block colon={false} label={<Img id={item.id} />}>
                  <Form.Checkbox name={i} onChange={props.toggleItem} value={item.active} />
                </Form.Block>
              </Col>
            );
          })}
        </Row>
      </Card>

      <Card title="Rune prices">
        <Row>
          {["nature", "law", "cosmic"].map(rune => (
            <Col key={rune} span={8}>
              <Form.Block label={<Img id={rune + "_rune"} />}>
                <Form.InputNumber value={props.runes[rune].current} />
              </Form.Block>
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="Current points">
        {props.pointTypes.map(type => (
          <Col key={type.id} span={12}>
            <Form.Block colon={false} label={type.label}>
              <Form.InputNumber data={{ type: "currentP" }} value={props[type.id + "CurrentP"]} onChange={props.updateConf} name={type.id + "CurrentP"} />
            </Form.Block>
          </Col>
        ))}
      </Card>

      <Card title="Telekinetic" extra={renderPointStatus(props.teleCurrentP, pointsNeeded.tele)}>
        <Row>
          <Col span={12}>
            <Form.Block
              lSize={14}
              label={
                <Tooltip title="(5 mazes X 2 points per maze + 8 bonus) / 5 mazes" icon="question-circle">
                  Points/maze
                </Tooltip>
              }
            >
              <Form.InputNumber onChange={props.updateConf} name="telePointsPerMaze" value={props.telePointsPerMaze} />
            </Form.Block>
          </Col>

          <Col span={12}>
            <Form.Block
              lSize={14}
              label={
                <Tooltip title="Calculated by taking the sum of law runes used for each type of maze divided by the amount of maze types" icon="question-circle">
                  Laws/maze
                </Tooltip>
              }
            >
              <Form.InputNumber onChange={props.updateConf} name="teleLawsPerMaze" value={props.teleLawsPerMaze} />
            </Form.Block>
          </Col>

          <Col span={12}>
            <Form.Block lSize={14} label="Seconds/maze">
              <Form.InputNumber onChange={props.updateConf} name="teleSecondsPerMaze" value={props.teleSecondsPerMaze} />
            </Form.Block>
          </Col>
        </Row>
      </Card>

      <Card title="Graveyard" extra={renderPointStatus(props.gravCurrentP, pointsNeeded.grav)}>
        <Row>
          <Col span={12}>
            <Form.Block lSize={14} label="Seconds/invent">
              <Form.InputNumber onChange={props.updateConf} name="gravSecondsPerInvent" value={props.gravSecondsPerInvent} />
            </Form.Block>
          </Col>
          <Col span={12}>
            <Form.Block lSize={14} label="Fruits/invent">
              <Form.InputNumber onChange={props.updateConf} name="gravFruitsPerInvent" value={props.gravFruitsPerInvent} />
            </Form.Block>
          </Col>
        </Row>
      </Card>
      <Card title="Enchant" extra={renderPointStatus(props.enchantCurrentP, pointsNeeded.enchant)}>
        <Row>
          <Col span={10}>
            <Form.Block lSize={8} label="Spell">
              <Form.Select onChange={props.updateConf} value={props.enchantLevel} name="enchantLevel" options={props.enchantLevels} />
            </Form.Block>
          </Col>
          <Col span={14}>
            <Form.Block
              lSize={16}
              label={
                <Tooltip title="Yes means hopping worlds to only enchant the spawned dragonstones. Enchanting these gives double the points over normal shapes" icon="question-circle">
                  World hopping
                </Tooltip>
              }
            >
              <Form.Select
                onChange={props.updateConf}
                name="enchantMultiplier"
                value={props.enchantMultiplier}
                options={[
                  {
                    value: 1,
                    label: "No"
                  },
                  {
                    value: 2,
                    label: "Yes"
                  }
                ]}
              />
            </Form.Block>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

const mapStateToProps = state => ({
  ...state.calcs.mta,
  runes: state.prices.runes
});

const mapDispatchToProps = {
  updateConf: ({ name, value }) => actions.updateConf(name, value),
  toggleAllItems: toggle => actions.toggleAllItems(toggle),
  selectWands: () => actions.selectWands(),
  toggleItem: ({ name }) => actions.toggleItem(name),
  reset: () => actions.reset()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conf);
