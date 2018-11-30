import React from "react";
import { connect } from "react-redux";

import { Card } from "components";

import Buy from "./runes/Buy";

const tabList = [
  {
    key: "buy",
    tab: "Buy"
  },
  { key: "sell", tab: "Sell" }
];

const Runes = props => {
  let content = null;

  switch (props.activeTab) {
    case "buy":
      content = <Buy />;
      break;

    default:
      break;
  }

  return (
    <Card activeTabKey={props.activeTab} onTabChange={props.onTabChange} tabList={tabList}>
      {content}
    </Card>
  );
};

const mapStateToProps = state => ({
  activeTab: state.prices.runes.activeTab
});

export default connect(
  mapStateToProps,
  {}
)(Runes);
