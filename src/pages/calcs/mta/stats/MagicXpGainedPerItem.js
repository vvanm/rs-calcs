import React from "react";

import { Card, Table, Row, Col, Img } from "components";
import { shortenN } from "functions";

export default props => {
  const { runesData, widthFull, widthItems, items, totalXpInfo } = props;

  return (
    <Card noPadding>
      {/* magic xp gained per item per rune*/}
      <Table
        rowClassName="smaller-fs"
        dataSource={[
          ...runesData,
          {
            id: "total",
            key: "total",
            totalXp: runesData.reduce((acc, el) => acc + el.totalXp, 0),
            ...items
              .map(item => {
                return {
                  ["xp" + item.id]: runesData.reduce((acc, el) => acc + el["xp" + item.id], 0)
                };
              })
              .reduce((result, item) => {
                var key = Object.keys(item)[0];
                result[key] = item[key];
                return result;
              }, {})
          }
        ]}
        footer={() => (
          <Row>
            <Col span={12}>
              Xp: {shortenN(totalXpInfo.startXp, -1)} &rarr; {shortenN(totalXpInfo.endXp, -1)} (+
              {shortenN(totalXpInfo.xpGained, -1)})
            </Col>

            <Col span={12}>
              Lvl: {totalXpInfo.startLevel} &rarr; {totalXpInfo.endLevel} (+
              {totalXpInfo.levelsGained})
            </Col>
          </Row>
        )}
        columns={[
          {
            key: "runeType",
            width: widthFull / 2 + "%",
            title: <Img id="magic" />,
            render: record => (record.key !== "total" ? <Img id={record.runeType + "_rune"} /> : "Total")
          },
          {
            key: "total",
            align: "center",
            width: widthFull / 2 + "%",
            title: "Total",
            render: record => shortenN(record.totalXp)
          },
          ...props.items.map(item => {
            return {
              key: item.id,
              align: "center",
              width: widthItems + "%",
              title: <Img gray={!item.active} id={item.id} />,
              render: record => (item.active ? shortenN(record["xp" + item.id]) : "")
            };
          })
        ]}
      />
    </Card>
  );
};
