// import React from 'react';

import { Button, ListGroupItem } from 'react-bootstrap';

const Channel = (props) => {
  const { channel } = props;
  const { name } = channel;
  return (
    <ListGroupItem className="ms-4 me-2 p-0">
      <Button variant="secondary" className="w-100 rounded-0 text-start">
        <span className="me-1">#</span>
        {name}
      </Button>
    </ListGroupItem>
  );
};

export default Channel;
