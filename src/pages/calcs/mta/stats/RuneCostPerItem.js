import React from "react";

import { Card, Table, Img } from "components";
import { shortenN } from "functions";

export default props => {
  const { runesData, widthFull, widthItems, items } = props;
  return (
    <Card noPadding>
      {/* Rune cost per item per rune*/}
      <Table
        rowClassName="smaller-fs"
        dataSource={[
          ...runesData,
          {
            id: "total",
            key: "total",
            totalPrice: runesData.reduce((acc, el) => acc + el.totalPrice, 0),
            ...props.items
              .map(item => {
                return {
                  ["price" + item.id]: runesData.reduce((acc, el) => acc + el["price" + item.id], 0)
                };
              })
              .reduce((result, item) => {
                var key = Object.keys(item)[0];
                result[key] = item[key];
                return result;
              }, {})
          }
        ]}
        columns={[
          {
            key: "runeType",
            width: widthFull / 2 + "%",
            title: <Img id="coins" />,
            render: record => (record.key !== "total" ? <Img id={record.runeType + "_rune"} /> : "Total")
          },
          {
            key: "total",
            align: "center",
            width: widthFull / 2 + "%",
            title: "Total",
            render: record => shortenN(record.totalPrice, -1)
          },
          ...items.map(item => {
            return {
              key: item.id,
              align: "center",
              width: widthItems + "%",
              title: <Img gray={!item.active} id={item.id} />,
              render: record => (item.active ? shortenN(record["price" + item.id], -1) : "")
            };
          })
        ]}
      />
    </Card>
  );
};
