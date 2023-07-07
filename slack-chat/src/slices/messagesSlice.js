/* eslint-disable no-param-reassign */
import
{
  createSlice,
  createEntityAdapter,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import getAuthHeader from '../helpers';
import { actions as channelActions } from './channelsSlice';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const request = getAuthHeader();
    const response = await axios.get(routes.usersPath(), { headers: request });
    return response.data.messages;
  },
);

const messageAdapter = createEntityAdapter();

const initialState = messageAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messageAdapter.addOne,
    addMessages: messageAdapter.addMany,
  },
  extraReducers: (builder) => {
    const { removeChannel } = channelActions;
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messageAdapter.addMany(state, action);
      })
      .addCase(removeChannel, (state, { payload }) => {
        const restEntities = Object.values(state.entities)
          .filter((message) => message.channelId !== payload);
        messageAdapter.setAll(state, restEntities);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messageAdapter.getSelectors((state) => state.messages);
export const selectByChannelIds = (id) => createSelector(
  selectors.selectAll,
  (messages) => messages.filter((message) => Number(message.channelId) === Number(id)),
);
export default messagesSlice.reducer;
