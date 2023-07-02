import React from 'react';
import {
  Button, Col, ListGroup, Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectors } from '../slices/channelsSlice';
import Channel from './Channel';

const Channels = () => {
  const channels = useSelector(selectors.selectAll);
  console.log(channels);

  return (
    <>
      <Row className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <Col>
          <b>Каналы</b>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="outline-primary" size="sm">
            <span><b>+</b></span>
          </Button>
        </Col>
      </Row>
      <Row>
        <ListGroup as="ul" className="rounded-0 mb-3 flex-column">
          {channels.map((channel) => (
            <Channel key={channel.id} channel={channel} />
          ))}
        </ListGroup>
      </Row>
    </>
  );
};

export default Channels;
