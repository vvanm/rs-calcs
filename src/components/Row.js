import React from "react";

import Base from "antd/lib/row";

const Row = props => {
  const _props = {
    gutter: props.gutter,
    type: props.justify === "space-between" ? "flex" : props.type,
    justify: props.justify,
    style: props.style
  };

  return <Base {..._props}>{props.children}</Base>;
};

Row.defaultProps = {
  gutter: 5,
  type: "",
  justify: "",
  style: {},
  children: []
};

export default Row;
