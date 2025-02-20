import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ERROR_MESSAGE, URL, WHITE_COLOR } from '../../constants';

const initialState = {
  todos: [],
  isLoading: false,
  error: '',
};

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(URL);
      const data = response?.data ?? []; // Safely handle undefined data
      return data.slice(0, 10).map(({ id, title }) => ({
        id: `${id}-${title}`,
        title,
        isDone: false,
        isResolved: false,
        color: WHITE_COLOR,
      }));
    } catch (err) {
      return rejectWithValue(err.message || ERROR_MESSAGE);
    }
  },
);

export const todoSlice = createSlice({
  initialState,
  name: 'todos',
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const index = state.todos.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.todos[index] = { ...state.todos[index], ...action.payload };
    },
    removeAllTodos: (state) => {
      state.todos = [];
    },
    resolveAllTodos: (state) => {
      state.todos = state.todos.map((todo) => {
        return { ...todo, isResolved: true };
      });
    },
    unresolveAllTodos: (state) => {
      state.todos = state.todos.map((todo) => {
        return { ...todo, isResolved: false };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isLoading = false;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || ERROR_MESSAGE;
      });
  },
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  removeAllTodos,
  resolveAllTodos,
  unresolveAllTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
