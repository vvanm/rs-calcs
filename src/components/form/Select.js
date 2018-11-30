import React from "react";
import { connect } from "react-redux";

import Base from "antd/lib/select";

const Select = props => {
  const onChange = value => {
    if (props.onChange === undefined) {
      return;
    }

    props.onChange({
      name: props.name,
      data: props.data,
      value
    });
  };

  let options = [];

  if (props.allowed === undefined && props.disabled === undefined) {
    options = props.options;
  }
  if (props.allowed !== undefined) {
    options = props.options.filter(o => props.allowed.includes(o.value));
  }

  return (
    <Base style={{ width: "100%" }} mode={props.mode} onChange={onChange} value={props.value}>
      {options.map(o => {
        return (
          <Base.Option value={o.value} key={o.value}>
            {o.label}
          </Base.Option>
        );
      })}
    </Base>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (typeof ownProps.options !== "string") {
    return { options: ownProps.options };
  }

  var options = state;
  for (var i = 0, path = ownProps.options.split(","), len = path.length; i < len; i++) {
    options = options[path[i]];
  }

  return {
    options: options
  };
};
export default connect(
  mapStateToProps,
  null
)(Select);
