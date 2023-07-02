import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { fetchChannels } from '../slices/channelsSlice';
import { fetchMessages } from '../slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
// import useAuth from '../hooks';
import Loader from './Loader';

const MainPage = () => {
  const [loadingState, setLoadingState] = useState('loading');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
    setLoadingState('idle');
  }, [dispatch]);

  return (
    loadingState === 'loading' ? <Loader />
      : (
        <Container className="my-4 rounded shadow overflow-hidden d-flex flex-column h-75">
          <Row className="bg-white h-100">
            <Col md="2" className="channels col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
              <Channels />
            </Col>
            <Col className="d-flex flex-column">
              <Messages />
            </Col>
          </Row>
        </Container>
      )
  );
};
export default MainPage;
