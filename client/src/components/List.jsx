import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4>
      There are {props.items.length} result(s) for your search!
    </h4>
    {props.items.map(item => <ListItem key={item.woeid} item={item} handleItemClick={props.handleItemClick} />)}
  </div>
)

export default List;