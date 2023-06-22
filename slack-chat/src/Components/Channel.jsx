// import React from 'react';

import { ListGroupItem } from 'react-bootstrap';

const Channel = (props) => {
  const { channel } = props;
  const { name } = channel;
  return (
    <ListGroupItem>
      {name}
    </ListGroupItem>
  );
};

export default Channel;
