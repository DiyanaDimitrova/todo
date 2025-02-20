import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from './index';

describe('Loading Component', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render loading container and circle', () => {
    render(<Loading />);
    const container = screen.getByLabelText('Loading...');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('container');
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('circle');
  });
});
