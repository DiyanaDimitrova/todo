import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './index';

describe('Todo Component', () => {
  const mockOnDelete = jest.fn();
  const mockOnResolveSingleTodo = jest.fn();
  const mockOnAddColor = jest.fn();

  const setup = (isResolved = false, color = 'TestColor') => {
    return render(
      <Todo
        text="Test Todo"
        onDelete={mockOnDelete}
        isResolved={isResolved}
        onResolveSingleTodo={mockOnResolveSingleTodo}
        color={color}
        onAddColor={mockOnAddColor}
      />
    );
  };

  test('should render correctly and match snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  test('should display the correct text', () => {
    setup();
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('should display the correct background color', () => {
    setup(false, 'red');
    // eslint-disable-next-line testing-library/no-node-access
    const container = screen.getByText('Test Todo').parentElement;
    expect(container).toHaveStyle('background: red');
  });

  test('should call onDelete when delete button is clicked', () => {
    // Pass mockOnDelete properly to the Todo component in the test
    render(
      <Todo
        text="Test Todo"
        onDelete={mockOnDelete}  // Pass the mock function here
        isResolved={false}
        onResolveSingleTodo={mockOnResolveSingleTodo}
        color="TestColor"
        onAddColor={mockOnAddColor}
      />
    );
  
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
  
    // Expect the mock function to have been called
    expect(mockOnDelete).toHaveBeenCalled();
  });

  test('should call onAddColor when add color button is clicked', () => {
    render(
      <Todo
        text="Test Todo"
        onDelete={mockOnDelete}  // Pass the mock function here
        isResolved={false}
        onResolveSingleTodo={mockOnResolveSingleTodo}
        color="TestColor"
        onAddColor={mockOnAddColor}
      />
    );
  
    const addColorButton = screen.getByText('Add Color');  // Select button by text
    fireEvent.click(addColorButton);
    expect(mockOnAddColor).toHaveBeenCalled();
  });

  test('should toggle isResolved when checkbox is clicked', () => {
    const mockOnResolveSingleTodo = jest.fn();
  
    render(
      <Todo
        isResolved={true}
        onResolveSingleTodo={mockOnResolveSingleTodo}
      />
    );
  
    // Ensure the checkbox is in the document and clickable
    const resolveCheckbox = screen.getByLabelText('Resolve');
    fireEvent.click(resolveCheckbox);
  
    // Verify the handler was called
    expect(mockOnResolveSingleTodo).toHaveBeenCalled();
  });
  

  test('should show DONE text when isResolved is true', () => {
    render(<Todo isResolved={true} />);
    expect(screen.getByText('Done')).toBeInTheDocument();  // Adjust the query for the Done text
  });

  test('should not show DONE text when isResolved is false', () => {
    setup(false);
    expect(screen.queryByText('DONE')).not.toBeInTheDocument();
  });
});
