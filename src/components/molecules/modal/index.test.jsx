import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './index';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnAddColor = jest.fn();
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should match snapshot when closed', () => {
    const { asFragment } = render(
      <Modal
        isOpen={false}
        onClose={mockOnClose}
        onAddColor={mockOnAddColor}
        header="Test Header"
      >
        <p>Test Content</p>
      </Modal>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should not render when isOpen is false', () => {
    render(
      <Modal
        isOpen={false}
        onClose={mockOnClose}
        onAddColor={mockOnAddColor}
        header="Test Header"
      >
        <p>Test Content</p>
      </Modal>,
    );
    expect(screen.queryByText('Test Header')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  test('should render correctly when isOpen is true', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onAddColor={mockOnAddColor}
        header="Test Header"
      >
        <p>Test Content</p>
      </Modal>,
    );
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onAddColor={mockOnAddColor}
        header="Test Header"
      >
        <p>Test Content</p>
      </Modal>,
    );
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should call onAddColor when add color button is clicked', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onAddColor={mockOnAddColor}
        header="Test Header"
      >
        <p>Test Content</p>
      </Modal>,
    );
    fireEvent.click(screen.getByText('Add Color'));
    expect(mockOnAddColor).toHaveBeenCalledTimes(1);
  });

  test('should close when clicking outside modal content', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onAddColor={mockOnAddColor}
        header="Test Header"
      >
        <p>Test Content</p>
      </Modal>,
    );
    fireEvent.click(screen.getByRole('dialog'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should not close when clicking inside modal content', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onAddColor={mockOnAddColor}
        header="Test Header"
      >
        <p>Test Content</p>
      </Modal>,
    );
    fireEvent.click(screen.getByText('Test Content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('should have correct aria attributes', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onAddColor={mockOnAddColor}
        header="Test Header"
      >
        <p>Test Content</p>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-header');
  });
});
