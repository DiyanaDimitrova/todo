import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './index';

describe('Checkbox Component', () => {
  const mockOnChange = jest.fn();

  test('should match snapshot', () => {
    const { asFragment } = render(
      <Checkbox label="Test" checked={true} onChange={mockOnChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call onChange when clicked', () => {
    render(<Checkbox label="Test" checked={true} onChange={mockOnChange} />);
    
    fireEvent.click(screen.getByLabelText(/test/i)); // Use label text for better accessibility
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('should not call onChange if not provided', () => {
    const { container } = render(<Checkbox label="Test" checked={true} />);
    
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(container.firstChild);
    // There should be no error, but no call to onChange
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
