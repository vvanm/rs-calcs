import React from "react";

import Base from "antd/lib/input";

export default props => {
  return <Base type={props.type} placeholder={props.placeholder} prefix={props.prefix} name={props.name} value={props.value} onChange={props.onChange} />;
};
