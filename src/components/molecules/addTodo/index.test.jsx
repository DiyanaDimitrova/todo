import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodo from './index';
import { ADD_TODO } from '../../../constants';

describe('AddTodo Component', () => {
  const mockOnClick = jest.fn();
  const mockOnInputChange = jest.fn();

  test('should match snapshot', () => {
    const { asFragment } = render(
      <AddTodo onClick={mockOnClick} onInputChange={mockOnInputChange} value="Test" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call onClick when button is clicked', () => {
    render(
      <AddTodo onClick={mockOnClick} onInputChange={mockOnInputChange} value="Test" />
    );
    fireEvent.click(screen.getByText(ADD_TODO));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('should call onInputChange when input value changes', () => {
    render(
      <AddTodo onClick={mockOnClick} onInputChange={mockOnInputChange} value="Test" />
    );
    fireEvent.change(screen.getByPlaceholderText(ADD_TODO), { target: { value: 'New Value' } });
    expect(mockOnInputChange).toHaveBeenCalledTimes(1);
  });

  test('should display the correct input value', () => {
    render(
      <AddTodo onClick={mockOnClick} onInputChange={mockOnInputChange} value="Test" />
    );
    expect(screen.getByPlaceholderText(ADD_TODO).value).toBe('Test');
  });
});
