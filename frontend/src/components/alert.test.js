import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';

describe('Alert component', () => {
  it('renders danger alert with messages', () => {
    const messages = ['Error 1', 'Error 2'];
    const { getByRole, getByText } = render(<Alert type="danger" messages={messages} />);
    
    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert-danger');
    
    messages.forEach(message => {
      const messageElement = getByText(message);
      expect(messageElement).toBeInTheDocument();
    });
  });

  it('renders default danger alert without messages', () => {
    const { getByRole } = render(<Alert />);
    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert-danger');
  });
});
