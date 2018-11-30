import React from "react";
import { connect } from "react-redux";

import { Form, Row, Col, Img, Button } from "components";
import { calcShopBuyPrice, round, shortenN } from "functions";

import { actions as ACTIONS } from "redux/prices/runes";

const Rune = props => {
  const { id, colSizings, shops, buyXOptions, rune, shop } = props;

  const calcAvgPrice = () => {
    if (shop === undefined || rune === undefined) {
      return 0;
    }
    return rune.activeShop === "ge" ? 0 : calcShopBuyPrice(rune.buyX, shop.base, shop.multiplier);
  };

  const avgPrice = round(calcAvgPrice(), 3);

  const setBuyPrice = () => {
    props.setBuyPrice(avgPrice);
  };

  return (
    <Form.Block noLayout>
      <Row>
        <Col span={colSizings.workingPrice}>
          <Form.InputNumber value={rune.current} />
        </Col>
        <Col span={colSizings.rune}>
          <Img id={id + "_rune"} />
        </Col>
        <Col span={colSizings.shop}>
          <Form.Select allowed={rune.shops} onChange={props.updateBuyShop} value={rune.activeShop} options={shops} />
        </Col>
        <Col span={colSizings.buyX}>
          <Form.Select onChange={props.updateBuyX} value={rune.buyX} options={buyXOptions} />
        </Col>
        <Col span={colSizings.avgPrice}>
          <Form.Text>{round(avgPrice, 1)}</Form.Text>
        </Col>
        <Col span={colSizings.set}>
          <Button onClick={setBuyPrice}>Set price</Button>
        </Col>
        <Col span={colSizings.runesNeeded}>
          <Form.InputNumber value={rune.runesNeeded} onChange={props.updateBuyRunesNeeded} />
        </Col>
        <Col span={colSizings.runesNeededCoins}>
          <Form.Text>{shortenN(rune.runesNeeded * avgPrice)}</Form.Text>
        </Col>
      </Row>
    </Form.Block>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const runes = state.prices.runes;
  return {
    colSizings: runes.colSizings,
    shops: runes.shops,
    buyXOptions: runes.buyXOptions,
    rune: runes[id],
    shop: runes[runes[id].activeShop][id]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps;
  return {
    updateBuyShop: ({ value }) => dispatch(ACTIONS.updateBuyShop(id, value)),
    updateBuyX: ({ value }) => dispatch(ACTIONS.updateBuyX(id, value)),
    setBuyPrice: price => dispatch(ACTIONS.setBuyPrice(id, price)),
    updateBuyRunesNeeded: ({ value }) => dispatch(ACTIONS.updateBuyRunesNeeded(id, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rune);
