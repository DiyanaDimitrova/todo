import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filters from './index';

describe('Filters Component', () => {
  const mockSetResolved = jest.fn();
  const mockSetUnresolved = jest.fn();
  const mockSetFilterColor = jest.fn();

  test('should match snapshot', () => {
    const { asFragment } = render(
      <Filters
        resolved={false}
        unresolved={false}
        dotColors={['#ff0000', '#00ff00']}
        setResolved={mockSetResolved}
        setUnresolved={mockSetUnresolved}
        setFilterColor={mockSetFilterColor}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call setResolved when resolved checkbox is clicked', () => {
    const setResolved = jest.fn();
    const dotColors = ['red', 'green', 'blue'];  // Define dotColors in your test
  
    render(
      <Filters
        resolved={false}
        unresolved={false}
        dotColors={dotColors}
        setResolved={setResolved}
        setUnresolved={jest.fn()}
        setFilterColor={jest.fn()}
      />
    );
  
    const resolvedCheckbox = screen.getByLabelText('Resolved');
    fireEvent.click(resolvedCheckbox);
  
    // Check that setResolved was called
    expect(setResolved).toHaveBeenCalled();
  });
  

  test('should call setUnresolved when unresolved checkbox is clicked', () => {
    render(
      <Filters
        resolved={false}
        unresolved={false}
        dotColors={[]}
        setResolved={mockSetResolved}
        setUnresolved={mockSetUnresolved}
        setFilterColor={mockSetFilterColor}
      />
    );
    fireEvent.click(screen.getByLabelText(/unresolved/i));
    expect(mockSetUnresolved).toHaveBeenCalledTimes(1);
  });

  test('should clear filters when clear filters button is clicked', () => {
    render(
      <Filters
        resolved={true}
        unresolved={true}
        dotColors={[]}
        setResolved={mockSetResolved}
        setUnresolved={mockSetUnresolved}
        setFilterColor={mockSetFilterColor}
      />
    );
    fireEvent.click(screen.getByText(/clear filters/i));
    expect(mockSetResolved).toHaveBeenCalledWith(false);
    expect(mockSetUnresolved).toHaveBeenCalledWith(false);
    expect(mockSetFilterColor).toHaveBeenCalledWith(false);
  });

  test('should call setFilterColor when color dot is clicked', () => {
    const setFilterColor = jest.fn();
  
    render(
      <Filters
        resolved={false}
        unresolved={false}
        dotColors={['red', 'blue', 'green']}
        setResolved={jest.fn()}
        setUnresolved={jest.fn()}
        setFilterColor={setFilterColor}
      />
    );
  
    // Simulate clicking the red color dot
    const redDot = screen.getByTestId('color-dot-red'); // Assuming you use testId in ColorDot
    fireEvent.click(redDot);
  
    // Verify the setFilterColor function was called with the correct color
    expect(setFilterColor).toHaveBeenCalledWith('red');
  });
});
