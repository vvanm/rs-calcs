import React, { Component } from "react";

import Base from "antd/lib/checkbox";

export default class Checkbox extends Component {
  static defaultProps = {
    disabled: false
  };
  onChange = e => {
    this.props.onChange({
      name: this.props.name,
      value: e.target.checked,
      data: this.props.data
    });
  };
  render() {
    const { value, disabled } = this.props;
    return (
      <Base checked={value} disabled={disabled} onChange={this.onChange}>
        {this.props.children}
      </Base>
    );
  }
}
