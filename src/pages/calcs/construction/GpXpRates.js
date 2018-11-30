import React from "react";

import { Card, Table, Img } from "components";
import { round } from "functions";

export default props => {
  const { gpXpRates, renderCostPopover } = props;

  return (
    <Card noPadding title="Gp/xp - 1 log - full cost">
      <Table
        dataSource={gpXpRates}
        columns={[
          {
            title: "Type",
            key: "type",
            render: record => <Img id={record.id} />
          },
          {
            title: "Xp",
            key: "xpPerPlank",
            render: record => round(record.xpPerPlank, 1)
          },
          {
            title: <Img id="coins" />,
            key: "cost",
            render: record => renderCostPopover(record)
          },
          {
            title: "Gp/xp",
            key: "gp/xp",
            render: record => round(record.totalGp / record.xpPerPlank, 2)
          }
        ]}
      />
    </Card>
  );
};
