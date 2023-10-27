import React from 'react';

function ErrorComponent(): JSX.Element {
  throw new Error('Oops, something went wrong!');
  return <div>Hello World!</div>;
}

export default ErrorComponent;
