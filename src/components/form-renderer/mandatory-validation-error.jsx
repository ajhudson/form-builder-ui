import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { string } from 'prop-types';
import React from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const MandatoryValidationError = ({ displayName }) => {
  return (
    <>
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        <FontAwesomeIcon icon={faExclamationTriangle} /> {displayName} is a mandatory
        field
      </p>
    </>
  );
};

export default MandatoryValidationError;

MandatoryValidationError.propTypes = {
  displayName: string.isRequired
};
