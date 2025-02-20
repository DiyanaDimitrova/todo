import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import todoReducer, { getTodos } from './todo';

jest.mock('axios');

describe('todoSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: todoReducer });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockData = [
    { id: 1, title: 'delectus aut autem' },
    { id: 2, title: 'quis ut nam facilis et officia qui' },
    { id: 3, title: 'fugiat veniam minus' },
    { id: 4, title: 'et porro tempora' },
    {
      id: 5,
      title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    },
    { id: 6, title: 'qui ullam ratione quibusdam voluptatem quia omnis' },
    { id: 7, title: 'illo expedita consequatur quia in' },
    { id: 8, title: 'quo adipisci enim quam ut ab' },
    { id: 9, title: 'molestiae perspiciatis ipsa' },
    { id: 10, title: 'illo est ratione doloremque quia maiores aut' },
  ];

  const transformedData = mockData.map(({ id, title }) => ({
    id: `${id}-${title}`,
    title,
    isDone: false,
    isResolved: false,
    color: '#ffffff',
  }));

  test('should dispatch getTodos and store transformed data', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(getTodos());

    expect(store.getState().todos).toEqual(transformedData);
    expect(store.getState().isLoading).toBe(false);
    expect(store.getState().error).toBe('');
  });

  test('should handle getTodos rejection and set error message', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await store.dispatch(getTodos());

    expect(store.getState().todos).toEqual([]);
    expect(store.getState().isLoading).toBe(false);
    expect(store.getState().error).toBe(errorMessage);
  });
});
