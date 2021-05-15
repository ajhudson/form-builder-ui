import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bool, string } from 'prop-types';
import React from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const MandatoryValidationError = ({ displayName, show }) => {
  return (
    <>
      {show && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          <FontAwesomeIcon icon={faExclamationTriangle} /> {displayName} is a
          mandatory field
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
