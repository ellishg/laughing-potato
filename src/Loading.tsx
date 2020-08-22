import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loading: React.FC = () => {
  // TODO: Center spinner.
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};