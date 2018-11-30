import React from "react";

import Base from "antd/lib/form";

const Block = props => {
  return (
    <Base.Item
      {...props}
      colon={false}
      {...(props.noLayout
        ? {}
        : {
            labelCol: {
              sm: { span: props.lSize }
            },
            wrapperCol: {
              sm: { span: 24 - props.lSize }
            }
          })}
    >
      {props.children}
    </Base.Item>
  );
};

Block.defaultProps = {
  lSize: 11,
  noColon: false
};

export default Block;
/*
  {...{
        colon: !props.noColon
      }}
      */
