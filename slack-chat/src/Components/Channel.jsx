// import React from 'react';

import { Button, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Channel = (props) => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { channel } = props;
  const { name, id } = channel;
  const btnVariant = currentChannelId === id ? 'secondary' : 'light';
  return (
    <ListGroupItem className="ms-4 me-2 p-0">
      <Button variant={btnVariant} className="w-100 rounded-0 text-start btn">
        {`# ${name}`}
      </Button>
    </ListGroupItem>
  );
};

export default Channel;
