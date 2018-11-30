import React from "react";
import { connect } from "react-redux";

import { Row, Col } from "components";

import Rune from "./buy/Rune";

const Buy = props => {
  const { colSizings } = props;

  return (
    <>
      <Row>
        <Col span={colSizings.workingPrice}>Working price</Col>
        <Col span={colSizings.rune}>Rune</Col>
        <Col span={colSizings.shop}>Shop</Col>
        <Col span={colSizings.buyX}>Buy X</Col>
        <Col span={colSizings.avgPrice}>Avg price</Col>
        <Col span={colSizings.set} />

        <Col span={colSizings.runesNeeded}>Runes needed</Col>
        <Col span={colSizings.runesNeededCoins}>Coins</Col>
      </Row>

      {props.types.map(rune => (
        <Rune key={rune} id={rune} />
      ))}
    </>
  );
};

const mapStateToProps = state => ({
  colSizings: state.prices.runes.colSizings,
  types: state.prices.runes.types
});

export default connect(
  mapStateToProps,
  null
)(Buy);
