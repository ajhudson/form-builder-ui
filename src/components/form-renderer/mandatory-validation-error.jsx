import { bool, string } from 'prop-types';
import React from 'react';

const MandatoryValidationError = ({ displayName, show }) => {
  return (
    <>
      {show && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          {displayName} is a mandatory field
        </p>
      )}
    </>
  );
};

export default MandatoryValidationError;

MandatoryValidationError.propTypes = {
  displayName: string.isRequired,
  show: bool.isRequired
};
