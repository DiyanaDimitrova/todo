import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './index';

describe('Button Component', () => {
  const mockOnClick = jest.fn();

  test('should match snapshot', () => {
    const { asFragment } = render(
      <Button text="Test" onClick={mockOnClick} type="button" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should trigger onClick when clicked', () => {
    render(<Button text="Test" onClick={mockOnClick} type="button" />);
    fireEvent.click(screen.getByText(/test/i));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('should render with default type button', () => {
    const { container } = render(
      <Button text="Default" onClick={mockOnClick} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveAttribute('type', 'button');
  });

  test('should render with custom type', () => {
    const { container } = render(
      <Button text="Submit" onClick={mockOnClick} type="submit" />
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveAttribute('type', 'submit');
  });
});
