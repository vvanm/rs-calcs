import React from "react";

import Base from "antd/lib/input";
import NumberFormat from "react-number-format";

const InputNumber = props => {
  const onChange = e => {
    if (props.onChange !== undefined) {
      props.onChange({
        name: props.name,
        value: e.target.value !== "" ? parseFloat(e.target.value.replace(/,/g, ""), 10) : "",
        data: props.data
      });
    }
  };

  const _props = {
    value: props.value,
    thousandSeparator: ",",
    decimalSeparator: ".",
    customInput: Base
  };

  return <NumberFormat onChange={onChange} {..._props} />;
};

export default InputNumber;
