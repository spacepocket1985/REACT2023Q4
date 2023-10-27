import { Component, ReactNode } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: '',
  };

  componentDidCatch(error: Error) {
    this.setState({
      hasError: true,
      error: error.toString(),
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <ErrorMessage errorMsg={this.state.error.toString()} />
          <h2>ErrorBoundary is working</h2>
          <button
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            home page
          </button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
