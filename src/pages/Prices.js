import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Row, Col, Menu, Card } from "components";

import PriceLoaderHOC from "./prices/PriceLoaderHOC";

import Runes from "./prices/Runes";

const items = [
  {
    link: "runes",
    label: "Runes",
    img: "air_rune",
    comp: Runes,
    categories: ["runes"]
  }
];

export default () => {
  return (
    <Row type="flex">
      <Col span={1} style={{ width: 220 }}>
        <Card noPadding>
          <Menu prefix="/prices/" options={items} />
        </Card>
      </Col>
      <Col span={1} style={{ flexGrow: 1 }}>
        <Switch>
          {items.map(item => (
            <Route key={item.link} path={"/prices/" + item.link} component={PriceLoaderHOC(item.comp, item.categories)} />
          ))}
          <Redirect to={`/prices/${items[0].link}`} />
        </Switch>
      </Col>
    </Row>
  );
};
