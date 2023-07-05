/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import getAuthHeader from '../helpers';

const channelsAdapter = createEntityAdapter();

const defaultChannelId = 1;
const initialState = channelsAdapter.getInitialState({ currentChannelId: defaultChannelId });

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const request = getAuthHeader();
    const response = await axios.get(routes.usersPath(), { headers: request });
    const { currentChannelId, channels } = response.data;
    return { currentChannelId, channels };
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
    // .addCase(fetchChannels.fulfilled, channelsAdapter.addMany);
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.currentChannelId = payload.currentChannelId;
        channelsAdapter.addMany(state, payload.channels);
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
