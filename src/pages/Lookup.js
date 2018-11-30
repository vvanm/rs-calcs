import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, Icon } from "components";

import Input from "antd/lib/input";

import { thunks } from "redux/lookup";

class Lookup extends Component {
  componentDidMount = () => {
    if (this.props.rsn !== "" && !this.props.rsnIsLoading && !this.props.rsnIsLoaded) {
      this.props.lookup(this.props.rsn);
    }
  };
  render() {
    const props = this.props;
    return (
      <Card title="Lookup">
        <Input.Search
          suffix={
            props.rsnIsLoading ? (
              <span key="icon" style={{ marginRight: 5 }}>
                <Icon type="loading" />
              </span>
            ) : (
              ""
            )
          }
          value={props.rsn}
          onChange={e => props.lookup(e.target.value)}
          onSearch={value => props.lookup(value)}
          placeholder="rsn"
          enterButton
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.lookup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    lookup: rsn => dispatch(thunks.lookupRsn(rsn))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lookup);
