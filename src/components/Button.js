import React from "react";

import Base from "antd/lib/button";

const Button = props => {
  const onClick = () => {
    if (props.onClick !== undefined) {
      props.onClick({
        data: props.data
      });
    }
  };

  const _props = {
    type: props.type,
    htmlType: props.htmlType,
    loading: props.loading,
    style: props.style,
    icon: props.icon
  };

  return (
    <Base {..._props} onClick={onClick}>
      {props.children}
    </Base>
  );
};

Button.defaultProps = {
  size: "default"
};

Button.Group = Base.Group;

export default Button;
