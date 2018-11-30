import React from "react";

import Base from "antd/lib/table";

const Table = props => {
  return <Base {...props} />;
};

Table.defaultProps = {
  size: "small",
  pagination: false,
  bordered: true
};

export default Table;
