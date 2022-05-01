import React from "react";

const TableHeadItem = ({ item }) => {
  return <th keyIndex={item.keyIndex}>{item.label}</th>;
};

export default TableHeadItem;
