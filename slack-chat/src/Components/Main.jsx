import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col, Container, Navbar, Row,
} from 'react-bootstrap';
import routes from '../routes';

import { actions as channelsActions } from '../slices/channelsSlice';
import {
  actions as messagesActions,
  selectors as messageSelector,
} from '../slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
import MessageInput from './MessageInput';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const MainPage = () => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const request = getAuthHeader();
      const response = await axios.get(routes.usersPath(), { headers: request });
      const { data } = response;
      const { channels, messages, currentChannelId } = data;
      const activeChannel = channels.find((channel) => channel.id === currentChannelId);
      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      setCurrentChannel(activeChannel.name);
    };
    fetchData();
  }, [dispatch]);
  const messages = useSelector(messageSelector.selectAll);

  return (
    <>
      <Navbar className="shadow-sm bg-white">
        <Container>
          <Navbar.Brand href="#">Hexlet Chat</Navbar.Brand>
          <Button>Sign Out</Button>
        </Container>
      </Navbar>
      <Container className="my-4 rounded shadow overflow-hidden d-flex flex-column h-75">
        <Row className="bg-white h-100">
          <Col md="2" className="channels col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
            <Channels />
          </Col>
          <Col className="d-flex flex-column">
            <Row className="mb-4 shadow-sm small p-3 bg-light">
              <b>{`# ${currentChannel}`}</b>
              <span className="text-muted">{`${messages.length} сообщений`}</span>
            </Row>
            <Row className="overflow-auto px-5">
              <Messages />
            </Row>
            <Row className="mt-auto px-5 py-3">
              <MessageInput />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainPage;
