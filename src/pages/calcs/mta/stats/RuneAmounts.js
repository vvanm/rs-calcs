import React from "react";

import { Card, Table, Img } from "components";
import { round } from "functions";

export default props => {
  const { widthFull, widthItems, runesData, items } = props;

  return (
    <Card noPadding>
      {/* Rune amount per item per rune*/}
      <Table
        rowClassName="smaller-fs"
        dataSource={runesData}
        columns={[
          ...[
            {
              key: "runeType",
              width: widthFull * 0.55 + "%",
              title: "Amount",
              render: record => <Img id={record.runeType + "_rune"} />
            },
            {
              key: "total",
              align: "center",
              width: widthFull * 0.45 + "%",
              title: "Total",
              render: record => round(record.totalRunes)
            }
          ],
          ...items.map(item => {
            return {
              key: item.id,
              align: "center",
              width: widthItems + "%",
              title: <Img gray={!item.active} id={item.id} />,
              render: record => (item.active ? round(record[item.id]) : "")
            };
          })
        ]}
      />
    </Card>
  );
};
