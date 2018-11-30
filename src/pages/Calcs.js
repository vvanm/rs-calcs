import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Row, Col, Card, Menu } from "components";

import PriceLoaderHOC from "./prices/PriceLoaderHOC";

import Lookup from "./Lookup";

import MTA from "./calcs/MTA";
import Construction from "./calcs/Construction";

const items = [
  {
    link: "mta",
    label: "Mage Training Arena",
    img: "infinity_boots",
    comp: MTA,
    categories: ["runes"]
  },
  {
    link: "construction",
    label: "Construction",
    img: "construction",
    comp: Construction,
    categories: ["runes"]
  }
];

export default props => {
  return (
    <Row type="flex">
      <Col span={1} style={{ width: 210 }}>
        <Lookup />

        <Card noPadding>
          <Menu selectedKeys={[props.location.patchname]} prefix="/calcs/" options={items} />
        </Card>
      </Col>

      <Col span={1} style={{ flexGrow: 1 }}>
        <Switch>
          {items.map(item => (
            <Route key={item.link} path={"/calcs/" + item.link} component={PriceLoaderHOC(item.comp, item.categories)} />
          ))}
          <Redirect to={"/calcs/" + items[0].link} />
        </Switch>
      </Col>
    </Row>
  );
};
