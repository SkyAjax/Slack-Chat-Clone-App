import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalsReducer from './modalsSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
});
