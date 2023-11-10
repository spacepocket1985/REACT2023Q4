import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Page404 from '../pages/Page404';

describe('404 Page component:', () => {
  test('displays when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Page404 />
      </MemoryRouter>
    );

    const messageElement = screen.getByText('404 - Not Found');
    expect(messageElement).toBeInTheDocument();
  });
});
