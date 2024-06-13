import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  pusherInstance :null
};

const socketSlice = createSlice({
  name: "socketReducer",
  initialState: initialState,
  reducers: {
    updateSocket(state, action) {
      console.log(
        "in reduxx============>",
        action.payload,
        "fffffffffffdfsdsdsd"
      );
      state.socket = action.payload;
    },
    setPusherInstance(state,action){
      state.pusherInstance = action.payload
    },
    
  },
});

export const { updateSocket } = socketSlice.actions;

export default socketSlice.reducer;
