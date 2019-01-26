import React from "react";

const ListItem = props => {
  var handleClick = function (e) {
    props.handleItemClick(props.item.woeid);
  };

  return <div onClick={handleClick}>{props.item.title}</div>;
};

export default ListItem;