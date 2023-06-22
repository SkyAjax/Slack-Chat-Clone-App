import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
