import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu from './index';
import { RESOLVE_ALL, UNRESOLVE_ALL, REMOVE_ALL } from '../../../constants';

describe('Menu Component', () => {
  const mockResolveHandler = jest.fn();
  const mockUnResolveHandler = jest.fn();
  const mockDeleteHandler = jest.fn();
  const mockAddHandler = jest.fn();
  const mockOnInputChangeHandler = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should match snapshot', () => {
    const { asFragment } = render(
      <Menu
        resolveHandler={mockResolveHandler}
        unResolveHandler={mockUnResolveHandler}
        deleteHandler={mockDeleteHandler}
        addHandler={mockAddHandler}
        onInputChangeHandler={mockOnInputChangeHandler}
        value="Test"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render all buttons with correct text', () => {
    render(
      <Menu
        resolveHandler={mockResolveHandler}
        unResolveHandler={mockUnResolveHandler}
        deleteHandler={mockDeleteHandler}
        addHandler={mockAddHandler}
        onInputChangeHandler={mockOnInputChangeHandler}
        value="Test"
      />,
    );
    expect(screen.getByText(RESOLVE_ALL)).toBeInTheDocument();
    expect(screen.getByText(UNRESOLVE_ALL)).toBeInTheDocument();
    expect(screen.getByText(REMOVE_ALL)).toBeInTheDocument();
  });

  test('should call resolveHandler when RESOLVE_ALL button is clicked', () => {
    render(
      <Menu
        resolveHandler={mockResolveHandler}
        unResolveHandler={mockUnResolveHandler}
        deleteHandler={mockDeleteHandler}
        addHandler={mockAddHandler}
        onInputChangeHandler={mockOnInputChangeHandler}
        value="Test"
      />,
    );
    fireEvent.click(screen.getByText(RESOLVE_ALL));
    expect(mockResolveHandler).toHaveBeenCalledTimes(1);
  });

  test('should call unResolveHandler when UNRESOLVE_ALL button is clicked', () => {
    render(
      <Menu
        resolveHandler={mockResolveHandler}
        unResolveHandler={mockUnResolveHandler}
        deleteHandler={mockDeleteHandler}
        addHandler={mockAddHandler}
        onInputChangeHandler={mockOnInputChangeHandler}
        value="Test"
      />,
    );
    fireEvent.click(screen.getByText(UNRESOLVE_ALL));
    expect(mockUnResolveHandler).toHaveBeenCalledTimes(1);
  });

  test('should call deleteHandler when REMOVE_ALL button is clicked', () => {
    render(
      <Menu
        resolveHandler={mockResolveHandler}
        unResolveHandler={mockUnResolveHandler}
        deleteHandler={mockDeleteHandler}
        addHandler={mockAddHandler}
        onInputChangeHandler={mockOnInputChangeHandler}
        value="Test"
      />,
    );
    fireEvent.click(screen.getByText(REMOVE_ALL));
    expect(mockDeleteHandler).toHaveBeenCalledTimes(1);
  });

  test('should pass correct value to AddTodo', () => {
    render(
      <Menu
        resolveHandler={mockResolveHandler}
        unResolveHandler={mockUnResolveHandler}
        deleteHandler={mockDeleteHandler}
        addHandler={mockAddHandler}
        onInputChangeHandler={mockOnInputChangeHandler}
        value="Test"
      />,
    );
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });

  test('should call onInputChangeHandler when input changes', () => {
    render(
      <Menu
        resolveHandler={mockResolveHandler}
        unResolveHandler={mockUnResolveHandler}
        deleteHandler={mockDeleteHandler}
        addHandler={mockAddHandler}
        onInputChangeHandler={mockOnInputChangeHandler}
        value="Test"
      />,
    );
    fireEvent.change(screen.getByDisplayValue('Test'), {
      target: { value: 'New Value' },
    });
    expect(mockOnInputChangeHandler).toHaveBeenCalledTimes(1);
  });

  test('should call addHandler when AddTodo button is clicked', () => {
    render(
      <Menu
        resolveHandler={mockResolveHandler}
        unResolveHandler={mockUnResolveHandler}
        deleteHandler={mockDeleteHandler}
        addHandler={mockAddHandler}
        onInputChangeHandler={mockOnInputChangeHandler}
        value="Test"
      />,
    );
    fireEvent.click(screen.getByText('Add Todo'));
    expect(mockAddHandler).toHaveBeenCalledTimes(1);
  });
});
