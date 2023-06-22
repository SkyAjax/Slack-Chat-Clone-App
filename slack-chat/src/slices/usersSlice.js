import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: userAdapter.addOne,
    addUsers: userAdapter.addMany,
  },
});

export const { actions } = usersSlice;
export const selectors = userAdapter.getSelectors((state) => state.users);
export default usersSlice.reducer;
