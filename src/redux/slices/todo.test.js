import { configureStore } from '@reduxjs/toolkit';
import { todoSlice, getTodos } from './todo';

describe('todoSlice', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should getTodos return data', async () => {
    const data = [
      {
        title: 'delectus aut autem',
        color: '#ffffff',
        id: '1-delectus aut autem',
        isDone: false,
        isResolved: false,
      },
      {
        title: 'quis ut nam facilis et officia qui',
        color: '#ffffff',
        id: '2-quis ut nam facilis et officia qui',
        isDone: false,
        isResolved: false,
      },
      {
        title: 'fugiat veniam minus',
        color: '#ffffff',
        id: '3-fugiat veniam minus',
        isDone: false,
        isResolved: false,
      },
      {
        title: 'et porro tempora',
        color: '#ffffff',
        id: '4-et porro tempora',
        isDone: false,
        isResolved: false,
      },
      {
        title:
          'laboriosam mollitia et enim quasi adipisci quia provident illum',
        color: '#ffffff',
        id: '5-laboriosam mollitia et enim quasi adipisci quia provident illum',
        isDone: false,
        isResolved: false,
      },
      {
        title: 'qui ullam ratione quibusdam voluptatem quia omnis',
        color: '#ffffff',
        id: '6-qui ullam ratione quibusdam voluptatem quia omnis',
        isDone: false,
        isResolved: false,
      },
      {
        title: 'illo expedita consequatur quia in',
        color: '#ffffff',
        id: '7-illo expedita consequatur quia in',
        isDone: false,
        isResolved: false,
      },
      {
        title: 'quo adipisci enim quam ut ab',
        color: '#ffffff',
        id: '8-quo adipisci enim quam ut ab',
        isDone: false,
        isResolved: false,
      },
      {
        title: 'molestiae perspiciatis ipsa',
        color: '#ffffff',
        id: '9-molestiae perspiciatis ipsa',
        isDone: false,
        isResolved: false,
      },
      {
        title: 'illo est ratione doloremque quia maiores aut',
        color: '#ffffff',
        id: '10-illo est ratione doloremque quia maiores aut',
        isDone: false,
        isResolved: false,
      },
    ];
    const store = configureStore({ reducer: todoSlice.reducer });
    await store.dispatch(getTodos());
    expect(store.getState()).toEqual({
      todos: data,
      isLoading: false,
      error: '',
    });
  });
});
