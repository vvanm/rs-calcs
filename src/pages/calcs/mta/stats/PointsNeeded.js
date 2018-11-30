import React from "react";

import { Card, Table, Img } from "components";

export default props => {
  const { pointsNeeded, widthFull, widthItems, items } = props;

  const renderPointsNeeded = (base, needed) => {
    return (
      <span>
        <div>{base}</div>
        <div className={needed > -1 ? "positive" : "negative"}>{(needed > -1 ? "+" : "") + needed}</div>
      </span>
    );
  };

  return (
    <Card noPadding>
      {/* Points per item table*/}
      <Table
        rowClassName="smaller-fs height-53"
        dataSource={pointsNeeded}
        columns={[
          ...[
            {
              key: "pointType",
              width: widthFull + "%",
              title: "Points",
              render: record => record.label
            }
          ],
          ...items.map(item => {
            return {
              key: item.id,
              align: "center",
              title: <Img gray={!item.active} id={item.id} />,
              width: widthItems + "%",
              render: record => (item.active ? renderPointsNeeded(record["base" + item.id], record[item.id]) : "")
            };
          })
        ]}
      />
    </Card>
  );
};
