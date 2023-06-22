import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectors } from '../slices/channelsSlice';
import Channel from './Channel';

const Channels = () => {
  const channels = useSelector(selectors.selectAll);
  return (
    <ListGroup as="ul">
      {channels.map((channel) => (
        <Channel key={channel.id} channel={channel} />
      ))}
    </ListGroup>
  );
};

export default Channels;
