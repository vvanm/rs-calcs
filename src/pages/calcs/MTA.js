import React from "react";

import { Row } from "components";

import Conf from "./mta/Conf";
import Stats from "./mta/Stats";

const MTA = () => {
  return (
    <Row type="flex">
      <Conf />
      <Stats />
    </Row>
  );
};

export default MTA;
