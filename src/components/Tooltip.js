import React from "react";

import Base from "antd/lib/tooltip";
import Icon from "antd/lib/icon";

export default props => {
  const { title, icon, children } = props;

  return (
    <Base title={title}>
      {icon !== undefined && <Icon style={{ marginRight: 2 }} type={icon} />}
      {children}
    </Base>
  );
};
