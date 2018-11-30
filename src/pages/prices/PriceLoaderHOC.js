import React, { Component } from "react";
import { connect } from "react-redux";

import { thunks } from "redux/prices";

export default function(MainComponent, categories) {
  class PriceLoaderHOC extends Component {
    componentDidMount = () => {
      categories.forEach(category => {
        if (!this.props[category].geIsLoaded && !this.props[category].geIsLoading) {
          this.props.getGePrices(category);
        }
      });
    };
    render() {
      return <MainComponent />;
    }
  }
  const mapStateToProps = state => {
    let o = {};
    categories.forEach(category => {
      o[category] = {
        ...state.prices[category]
      };
    });
    return o;
  };

  const mapDispatchToProps = {
    getGePrices: category => thunks.getGePricesForCategory(category)
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(PriceLoaderHOC);
}
