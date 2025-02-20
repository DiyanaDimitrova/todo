import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ERROR_MESSAGE, URL, WHITE_COLOR } from '../../constants';

const initialState = {
  todos: [],
  isLoading: false,
  error: '',
};

export const getTodos = createAsyncThunk(
  'getTodos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios(URL);
      return data.slice(0, 10).map((todo) => {
        return {
          id: `${todo.id}-${todo.title}`,
          title: todo.title,
          isDone: false,
          isResolved: false,
          color: WHITE_COLOR,
        };
      });
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

export const todoSlice = createSlice({
  initialState,
  name: 'todo',
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
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isLoading = false;
      })
      .addCase(getTodos.rejected, (state) => {
        state.isLoading = false;
        state.error = ERROR_MESSAGE;
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
