import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ColorDot from './index'; // Import the ColorDot component

test('should not call onClick if not provided', () => {
  const { container } = render(<ColorDot color="#ffffff" onClick={() => {}} />);
  
  // eslint-disable-next-line testing-library/no-node-access
  fireEvent.click(container.firstChild);  // Trigger the click event on the first child
});

test('should call onClick when clicked', () => {
  const mockOnClick = jest.fn();  // Create a mock function

  render(<ColorDot color="#ffffff" onClick={mockOnClick} />);

  // Use getByTestId to query the div (or button if changed to button)
  fireEvent.click(screen.getByTestId('color-dot-#ffffff'));  // Trigger the click event

  // Check if onClick was called
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
