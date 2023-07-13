import React, { useEffect, useState } from 'react';//
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { fetchChannels, actions as channelActions } from '../slices/channelsSlice';
import { fetchMessages, actions as messageActions } from '../slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
import Spinner from './Spinner';
import socket from '../socket';

const MainPage = () => {
  const [loadingState, setLoadingState] = useState('loading');
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(fetchChannels());
        await dispatch(fetchMessages());
      } catch (e) {
        setLoadingState('loading');
      }
      setLoadingState('idle');
    };
    fetch();

    socket.on('removeChannel', (payload) => {
      dispatch(channelActions.removeChannel(payload.id));
      dispatch(channelActions.setActiveChannel({ id: 1 }));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(channelActions.renameChannel(
        { id: payload.id, changes: { name: [payload.name] } },
      ));
    });

    socket.on('newChannel', (payload) => {
      dispatch(channelActions.addChannel(payload));
      dispatch(channelActions.setActiveChannel(payload));
    });

    socket.on('newMessage', (payload) => {
      dispatch(messageActions.addMessage(payload));
    });

    return () => {
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('newChannel');
      socket.off('newMessage');
    };
  }, [dispatch]);

  return (
    loadingState === 'loading' ? <Spinner />
      : (
        <Container className="my-4 rounded shadow overflow-hidden h-100">
          <Row className="bg-white h-100 flex-md-row">
            <Col className="channels col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
              <Channels />
            </Col>
            <Col className="p-0 h-100">
              <Messages />
            </Col>
          </Row>
        </Container>
      )
  );
};
export default MainPage;
