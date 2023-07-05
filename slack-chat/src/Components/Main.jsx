import React, { useEffect, useState } from 'react';//
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { fetchChannels } from '../slices/channelsSlice';
import { fetchMessages } from '../slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
// import useAuth from '../hooks';
import Spinner from './Spinner';

const MainPage = () => {
  const [loadingState, setLoadingState] = useState('loading');
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchChannels());
      await dispatch(fetchMessages());
      setLoadingState('idle');
    };
    fetch();
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
