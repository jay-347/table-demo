import React from "react";
import TableRow from "./TableRow";
import TableHeadItem from "./TableHead";

const Table = ({ theadData, tbodyData, customClass }) => {
  return (
    <div className="table-wrapper">
      <table className={customClass?.root}>
        <thead>
          <tr>
            {theadData.map((h) => {
              return <TableHeadItem key={h.title} item={h} />;
            })}
          </tr>
        </thead>
        <tbody>
          {tbodyData.map((item) => {
            return <TableRow key={item.id} data={item} theadData={theadData} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
