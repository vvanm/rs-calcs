import React from "react";

import Base from "antd/lib/card";

export default props => {
  let _props = {
    ...props,
    bodyStyle: props.noPadding ? { padding: 0 } : {}
  };

  delete _props.noPadding;

  return <Base {..._props}>{props.children}</Base>;
};
