import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messageAdapter = createEntityAdapter();

const initialState = messageAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messageAdapter.addOne,
    addMessages: messageAdapter.addMany,
  },
});

export const { actions } = messagesSlice;
export const selectors = messageAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
