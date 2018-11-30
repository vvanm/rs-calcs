import React from "react";
import { connect } from "react-redux";

import { Col } from "components";
import { determineInfoFromXp } from "functions";

import PointsNeeded from "./stats/PointsNeeded";
import RuneAmounts from "./stats/RuneAmounts";
import RuneCostPerItem from "./stats/RuneCostPerItem";
import MagicXpGainedPerItem from "./stats/MagicXpGainedPerItem";

const Stats = props => {
  const calcMidPoints = (current, _current, type) => {
    return current[type] > 0 ? 0 : _current[type] > 0 ? Math.abs(current[type]) : Math.abs(current[type]) + _current[type];
  };

  let currentP = {
    tele: props.teleCurrentP,
    grav: props.gravCurrentP,
    enchant: props.enchantCurrentP,
    alch: props.alchCurrentP
  };

  let pointsNeeded = props.pointTypes;
  let runesData = ["law", "nature", "cosmic"].map(item => {
    return {
      key: item,
      runeType: item,
      totalRunes: 0,
      totalXp: 0,
      totalPrice: 0
    };
  });

  const { points: enchPointsPerCast, exp: enchXpPerCast } = props.enchantLevels.find(level => level.value === props.enchantLevel);

  props.items.forEach(item => {
    if (!item.active) {
      return;
    }

    //placeholder points
    const _cP = { ...currentP };

    //points
    props.pointTypes.forEach((type, i) => {
      currentP[type.id] -= item.points[type.id];
      pointsNeeded[i]["base" + item.id] = item.points[type.id];
      pointsNeeded[i][item.id] = currentP[type.id];
    });

    //runes
    const laws = (calcMidPoints(currentP, _cP, "tele") / props.telePointsPerMaze) * props.teleLawsPerMaze;
    const cosmics = calcMidPoints(currentP, _cP, "enchant") / (enchPointsPerCast * props.enchantMultiplier);
    const natsGrav = calcMidPoints(currentP, _cP, "grav") / (props.gravFruitsPerInvent / props.gravFruitsPerPoint);
    const natsAlch = calcMidPoints(currentP, _cP, "alch") / props.alchPointsPerAlch;

    //add to data
    //laws
    runesData[0][item.id] = laws;
    runesData[0]["price" + item.id] = runesData[0][item.id] * props.runes.law.current;
    runesData[0]["xp" + item.id] = runesData[0][item.id] * props.xpTelegrab;
    runesData[0].totalRunes += runesData[0][item.id];
    runesData[0].totalPrice += runesData[0]["price" + item.id];
    runesData[0].totalXp += runesData[0]["xp" + item.id];
    //natures
    runesData[1][item.id] = natsAlch + natsGrav;
    runesData[1]["price" + item.id] = runesData[1][item.id] * props.runes.nature.current;
    runesData[1]["xp" + item.id] = runesData[1][item.id] * props.xpAlch;
    runesData[1].totalRunes += runesData[1][item.id];
    runesData[1].totalPrice += runesData[1]["price" + item.id];
    runesData[1].totalXp += runesData[1]["xp" + item.id];
    //cosmics
    runesData[2][item.id] = cosmics;
    runesData[2]["price" + item.id] = runesData[2][item.id] * props.runes.cosmic.current;
    runesData[2]["xp" + item.id] = runesData[2][item.id] * enchXpPerCast;
    runesData[2].totalRunes += runesData[2][item.id];
    runesData[2].totalPrice += runesData[2]["price" + item.id];
    runesData[2].totalXp += runesData[2]["xp" + item.id];
  });

  const { magicLevel: level, magicXp: xp } = props.skills;

  const totalXpInfo = determineInfoFromXp(xp, level, runesData.reduce((acc, el) => acc + el.totalXp, 0));

  //calculate sizing
  const widthFull = 100 - 88;
  const widthItems = (100 - widthFull) / props.items.length;

  const sharedProps = {
    items: props.items,
    widthFull,
    widthItems
  };

  return (
    <Col span={1} style={{ flexGrow: 1 }}>
      <PointsNeeded {...sharedProps} pointsNeeded={pointsNeeded} />
      <RuneAmounts {...sharedProps} runesData={runesData} />
      <RuneCostPerItem {...sharedProps} runesData={runesData} />
      <MagicXpGainedPerItem {...sharedProps} totalXpInfo={totalXpInfo} runesData={runesData} />
    </Col>
  );
};

const mapStateToProps = state => {
  return {
    ...state.calcs.mta,
    runes: state.prices.runes,
    skills: state.lookup.skills
  };
};

export default connect(mapStateToProps)(Stats);
