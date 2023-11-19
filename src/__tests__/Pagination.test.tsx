import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import Pagination from '../components/Pagination/Pagination';

describe('Pagination', () => {
  // Test case for rendering the Pagination component
  it('renders without crashing', () => {
    // Render the Pagination component inside Router and Provider for necessary context
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <Pagination nextPage="2" prevPage="1" />
        </Provider>
      </Router>
    );

    // Check if the page informer is correctly rendered
    expect(getByTestId('informer')).toBeInTheDocument();
  });

  // Test case for checking the select dropdown functionality
  it('verify that the component renders the specified number of cards(updates the characters per page when a different option is selected)', () => {
    // Mock the useDispatch hook from react-redux
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => jest.fn(),
    }));

    // Render the Pagination component inside Router and Provider for necessary context
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <Pagination nextPage="2" prevPage="1" />
        </Provider>
      </Router>
    );

    // Get the select dropdown element
    const select = getByTestId('characters-number') as HTMLInputElement;

    // Fire a change event on the select dropdown with a new value
    fireEvent.change(select, { target: { value: '10' } });

    // Check if the select dropdown's value has been updated
    expect(select.value).toBe('10');
  });

  it('make sure the component updates URL query parameter when page changes', () => {
    // Render the Pagination component inside Router and Provider for necessary context
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <Pagination nextPage="3" prevPage="2" />
        </Provider>
      </Router>
    );

    // Click 'Next page' button
    fireEvent.click(getByText('Next'));

    // Check if the URL has changed to the next page
    expect(window.location.pathname).toBe(`/page=3`);

    // Click 'Next page' button
    fireEvent.click(getByText('Previous'));

    // Check if the URL has changed to the next page
    expect(window.location.pathname).toBe(`/page=2`);
  });
});
