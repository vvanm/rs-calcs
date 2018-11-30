import React from "react";
import { connect } from "react-redux";

import { Row, Col, Popover, Card, Table, Img, Form } from "components";
import { shortenN, isNumber, determineInfoFromXp, round, getPlankMakeStats } from "functions";

import { actions } from "redux/calcs/construction";

import StartGoals from "./construction/StartGoals";
import BankedXp from "./construction/BankedXp";
import Settings from "./construction/Settings";
import GpXpRates from "./construction/GpXpRates";

const Construction = props => {
  const renderRuneAmounts = record => {
    return (
      <>
        <div style={{ float: "left", width: "50%" }}>
          <Img id="nature_rune" /> {shortenN(record.nature, -1)}
        </div>
        <div style={{ float: "left", width: "50%" }}>
          <Img id="astral_rune" /> {shortenN(record.astral, -1)}
        </div>
      </>
    );
  };

  const getXpPerPlank = plank => {
    return plank.xp * (plank.id === "teak_plank" ? props.teakItems.find(item => item.value === props.plankMakingTeakItem).value : 1);
  };
  const getServantCost = (amountOfLogs, isUnnotingCalc) => {
    if (props.plankMakingMethod === 2 || isUnnotingCalc) {
      const servantInfo = props.plankMakingServants.find(servant => servant.value === props.plankMakingServant);
      return (amountOfLogs / (servantInfo.invent * 8)) * servantInfo.cost;
    }
    return 0;
  };
  const calcPlankStats = (plank, toMake, made) => {
    const xpPerPlank = getXpPerPlank(plank);
    //calc lunar plank mage
    const plankMake = getPlankMakeStats(props.plankMakingMethod, toMake);
    //calc costs
    const sawmillCost = toMake * (props.plankMakingMethod === 3 ? plank.costToMake * 0.7 : plank.costToMake);
    const servantPlankingCost = getServantCost(toMake);
    const servantUnnotingCost = getServantCost(toMake + made, true);
    const runesCost = plankMake.nature * 212 + plankMake.astral * 70;
    const totalGp = sawmillCost + servantPlankingCost + servantUnnotingCost + runesCost;
    //calcs xp
    const xpFromLogs = xpPerPlank * toMake;
    const xpFromPlanks = xpPerPlank * made;
    const totalXp = (toMake + made) * xpPerPlank;
    const totalPlanks = toMake + made;
    return {
      xpPerPlank,
      ...plankMake,
      sawmillCost,
      servantPlankingCost,
      servantUnnotingCost,
      runesCost,
      totalGp,
      xpFromLogs,
      xpFromPlanks,
      totalXp,
      totalPlanks
    };
  };
  const updateSelectedRemainingType = ({ data }) => {
    props.updateConf({ name: "selectedRemainingType", value: data.id });
  };
  const renderTotalTable = (totals, dataSource) => {
    return (
      <Table
        dataSource={dataSource}
        columns={[
          {
            width: "5%",
            title: "Skill",
            key: "skill",
            render: record => <Img id={record.id} />
          },
          /*
          {
            title: "Gp/xp",
            key: "gpXp",
            render: record => record.gpXp
          },*/
          {
            title: "Xp",
            key: "xp",
            children: [
              {
                title: "From",
                width: "14%",
                key: "xpFrom",
                render: record => shortenN(record.startXp, -1)
              },
              {
                title: "To",
                key: "xpTo",
                width: "14%",
                render: record => shortenN(record.endXp, -1)
              },
              {
                title: "Gained",
                width: "12%",
                key: "xpGained",
                render: record => "+" + shortenN(record.xpGained)
              }
            ]
          },
          {
            title: "Level",
            key: "level",

            children: [
              {
                title: "From",
                key: "levelFrom",
                width: "14%",
                render: record => shortenN(record.startLevel)
              },
              {
                title: "To",
                key: "levelTo",
                width: "14%",
                render: record => shortenN(record.endLevel)
              },
              {
                title: "Gained",
                width: "12%",
                key: "levelGained",
                render: record => "+" + shortenN(record.levelsGained)
              }
            ]
          },
          {
            title: "Next",
            width: "15%",
            key: "xpToLevel",
            render: record => shortenN(record.nextLevelRemaining) + " (" + record.nextLevel + ")"
          }
        ]}
      />
    );
  };
  const renderCostPopover = record => {
    return (
      <Popover
        placement="right"
        content={
          <React.Fragment>
            <div>Sawmill: {shortenN(record.sawmillCost, -1)}</div>
            <div>Butler planking: {shortenN(record.servantPlankingCost, -1)}</div>
            <div>Butler unnoting: {shortenN(record.servantUnnotingCost, -1)}</div>
            <div>Runes: {shortenN(record.runesCost, -1)}</div>
          </React.Fragment>
        }
        title={"Gp breakdown"}
      >
        {shortenN(record.totalGp, -1)}
      </Popover>
    );
  };
  const calcTotal = input => {
    return input.reduce(
      (acc, el) => {
        return {
          totalPlanks: acc.totalPlanks + isNumber(el.totalPlanks),
          nature: acc.nature + isNumber(el.nature),
          astral: acc.astral + isNumber(el.astral),
          magicXp: acc.magicXp + isNumber(el.magicXp),
          sawmillCost: acc.sawmillCost + isNumber(el.sawmillCost),
          servantPlankingCost: acc.servantPlankingCost + isNumber(el.servantPlankingCost),
          servantUnnotingCost: acc.servantUnnotingCost + isNumber(el.servantUnnotingCost),
          runesCost: acc.runesCost + isNumber(el.runesCost),
          totalGp: acc.totalGp + isNumber(el.totalGp),
          xpFromLogs: acc.xpFromLogs + isNumber(el.xpFromLogs),
          xpFromPlanks: acc.xpFromPlanks + isNumber(el.xpFromPlanks),
          totalXp: acc.totalXp + isNumber(el.totalXp)
        };
      },
      {
        totalPlanks: 0,
        nature: 0,
        astral: 0,
        magicXp: 0,
        sawmillCost: 0,
        servantPlankingCost: 0,
        servantUnnotingCost: 0,
        runesCost: 0,
        totalGp: 0,
        xpFromLogs: 0,
        xpFromPlanks: 0,
        totalXp: 0
      }
    );
  };
  const gpXpRates = props.plank_types.map(plank => {
    return {
      ...plank,
      ...calcPlankStats(plank, 1, 0)
    };
  });

  //calc bankedXp
  const bankedXp = [
    ...props.plank_types.map((plank, i) => {
      return {
        ...plank,
        type: "plank",
        ...calcPlankStats(plank, props[props.log_types[i].id], props[plank.id])
      };
    }),
    ...props.bone_types.map(bone => {
      return {
        ...bone,
        totalXp: props[bone.id] * bone.xp
      };
    })
  ];

  const bankedXpTotal = calcTotal(bankedXp);
  const bankedXpInfo = determineInfoFromXp(props.xp, props.level, bankedXpTotal.totalXp);
  const bankedMagicXpInfo = determineInfoFromXp(props.magicXp, props.magicLevel, bankedXpTotal.magicXp);

  //check if we have reached the goalLevel
  const remainingXp = bankedXpInfo.endXp - props.goalXp;

  const remainingNeeded = remainingXp < 0 ? true : false;
  const remainingPlanks = remainingNeeded
    ? props.plank_types.map(plank => {
        return {
          ...plank,
          ...calcPlankStats(plank, Math.ceil(Math.abs(remainingXp) / getXpPerPlank(plank)), 0)
        };
      })
    : [];
  const remainingPlankInfo = remainingNeeded ? remainingPlanks.find(plank => plank.id === props.selectedRemainingType) : {};
  const remainingXpInfo = remainingNeeded ? determineInfoFromXp(bankedXpInfo.endXp, bankedXpInfo.endLevel, remainingPlankInfo.totalXp) : {};
  const remainingMagicXpInfo = remainingNeeded ? determineInfoFromXp(bankedMagicXpInfo.endXp, bankedMagicXpInfo.endLevel, remainingPlankInfo.magicXp) : {};

  return (
    <Row type="flex">
      <Col span={1} style={{ width: 320 }}>
        <StartGoals {...props} />
        <BankedXp {...props} />
        <Settings {...props} />
        <GpXpRates {...props} gpXpRates={gpXpRates} renderCostPopover={renderCostPopover} />
      </Col>
      <Col span={1} style={{ flexGrow: 1 }}>
        <Row type="flex">
          <Col span={1} style={{ width: 650 }}>
            <Card noPadding title="Banked xp totals" extra={remainingXp !== undefined ? <span className={remainingXp < 0 ? "neg" : "pos"}>{(remainingXp < 0 ? "(MISSING) " : "(SURPLUS) +") + shortenN(remainingXp, -1) + " xp"}</span> : ""}>
              {renderTotalTable(bankedXpTotal, [
                {
                  id: "construction",
                  ...bankedXpInfo,
                  gpXp: round(bankedXpTotal.totalGp / bankedXpTotal.totalXp, 2)
                },
                {
                  id: "magic",
                  ...bankedMagicXpInfo,
                  gpXp: ""
                }
              ])}
            </Card>

            {remainingNeeded && (
              <Card noPadding title="Remaining xp totals">
                {renderTotalTable(remainingPlankInfo, [
                  {
                    id: "construction",
                    ...remainingXpInfo,
                    gpXp: round(remainingPlankInfo.totalGp / remainingPlankInfo.totalXp, 2)
                  },
                  {
                    id: "magic",
                    ...remainingMagicXpInfo
                  }
                ])}
              </Card>
            )}

            <Card title="Cost overview" noPadding>
              <Table
                dataSource={[
                  {
                    type: "Sawmill",
                    key: "sawmill",
                    banked: bankedXpTotal.sawmillCost,
                    remaining: remainingPlankInfo.sawmillCost
                  },
                  {
                    type: "Butler planking",
                    key: "butler_planking",
                    banked: bankedXpTotal.servantPlankingCost,
                    remaining: remainingPlankInfo.servantPlankingCost
                  },
                  {
                    type: "Butler unnoting",
                    key: "butler_unnoting",
                    banked: bankedXpTotal.servantUnnotingCost,
                    remaining: remainingPlankInfo.servantUnnotingCost
                  },
                  {
                    type: "Runes",
                    key: "runes",
                    banked: bankedXpTotal.runesCost,
                    remaining: remainingPlankInfo.runesCost
                  },
                  {
                    type: "Total",
                    key: "total",
                    banked: bankedXpTotal.totalGp,
                    remaining: remainingPlankInfo.totalGp
                  }
                ]}
                columns={[
                  {
                    title: <Img id="coins" />,
                    key: "coins",
                    render: record => record.type
                  },
                  {
                    title: "Banked",
                    key: "banked",
                    render: record => shortenN(record.banked)
                  },
                  {
                    title: "Remaining",
                    key: "remaining",
                    render: record => shortenN(isNumber(record.remaining, 0))
                  },
                  {
                    title: "total",
                    key: "total",
                    render: record => shortenN(isNumber(record.banked, 0) + isNumber(record.remaining, 0))
                  }
                ]}
              />
            </Card>
            {props.plankMakingMethod === 3 && (
              <Card noPadding>
                <Table
                  dataSource={[
                    {
                      rune: "nature",
                      banked: bankedXpTotal.nature,
                      remaining: remainingPlankInfo.nature
                    },
                    {
                      rune: "astral",
                      banked: bankedXpTotal.astral,
                      remaining: remainingPlankInfo.astral
                    }
                  ]}
                  columns={[
                    {
                      title: "Runes",
                      key: "runes",
                      render: record => <Img id={record.rune + "_rune"} />
                    },
                    {
                      title: "Banked",
                      render: record => shortenN(record.banked, -1)
                    },
                    {
                      title: "Remaining",
                      render: record => shortenN(record.remaining, -1)
                    },
                    {
                      title: "Total",
                      render: record => shortenN(record.banked + record.remaining, -1)
                    }
                  ]}
                />
              </Card>
            )}
          </Col>
          <Col span={1} style={{ flexGrow: 1 }}>
            <Card noPadding title="Banked xp overview">
              <Table
                dataSource={bankedXp}
                columns={[
                  {
                    title: "Planks",
                    key: "type",
                    render: record => (record.id !== "total" ? <Img id={record.id} /> : "Total")
                  },
                  {
                    title: <Img id="coins" />,
                    key: "gpCost",
                    render: record => (record.type === "plank" ? renderCostPopover(record) : "")
                  },

                  {
                    title: "Runes",
                    key: "runes",
                    render: record => (record.type === "plank" ? renderRuneAmounts(record) : "")
                  },
                  {
                    title: "Xp logs",
                    key: "xpFromLogs",
                    render: record => shortenN(record.xpFromLogs, -1)
                  },

                  {
                    title: "Xp planks",
                    key: "xpFromPlanks",
                    render: record => shortenN(record.xpFromPlanks, -1)
                  },
                  {
                    title: "Planks",
                    key: "totalPlanks",
                    render: record => shortenN(record.totalPlanks, -1)
                  },
                  {
                    title: "Total xp",
                    key: "totalXp",
                    render: record => shortenN(record.totalXp, -1)
                  }
                ]}
              />
            </Card>
            {remainingNeeded && (
              <Card noPadding title="Remaining xp">
                <Table
                  dataSource={remainingPlanks}
                  columns={[
                    {
                      title: "",
                      key: "select",
                      render: record => <Form.Checkbox name="selectedRemainingType" onChange={updateSelectedRemainingType} value={props.selectedRemainingType === record.id} data={{ id: record.id }} />
                    },
                    {
                      title: "Planks",
                      key: "type",
                      render: record => (record.id !== "total" ? <Img id={record.id} /> : "Total")
                    },
                    {
                      title: "Amount",
                      key: "amount",
                      render: record => isNumber(record.totalPlanks).toLocaleString()
                    },
                    {
                      title: <Img id="coins" />,
                      key: "gpCost",
                      render: record => renderCostPopover(record)
                    },
                    {
                      title: "Runes",
                      key: "runes",
                      render: record => renderRuneAmounts(record)
                    }
                  ]}
                />
              </Card>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  ...state.calcs.construction,
  runes: state.prices.runes
});

const mapDispatchToProps = {
  updateConf: ({ name, value }) => actions.updateConf(name, value)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Construction);
