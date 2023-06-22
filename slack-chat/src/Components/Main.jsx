import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import routes from '../routes';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import Channels from './Channels';

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
      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      setCurrentChannel(currentChannelId);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>Hey, Man!</h1>
      <h3>{currentChannel}</h3>
      <Channels />
    </div>
  );
};

export default MainPage;
