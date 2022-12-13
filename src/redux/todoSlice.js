import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    colors: ["#ee5788", "#b05dc2", "#fecf48", "#47b8f6", "#a2cf74"],
  },
  reducers: {
    addTodo: (state, action) => {
      state.data.push({
        id: nanoid(),
        todo: action.payload.newTodo,
        bg: state.colors[action.payload.activeKey],
      });
    },
  },
});

export default todoSlice.reducer;
export const { addTodo } = todoSlice.actions;
