import React from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import ValidationTypes from './validation-types';
import MandatoryValidationError from './mandatory-validation-error';

const ValidationField = ({ validationInfo, show }) => {
  if (!show) {
    return null;
  }

  switch (validationInfo.validationType) {
    case ValidationTypes.MANDATORY:
      return (
        <MandatoryValidationError displayName={validationInfo.displayName} show />
      );

    default:
      return null;
  }
};

export default ValidationField;

ValidationField.propTypes = {
  validationInfo: PropTypes.shape({
    validationType: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired
  }),
  show: PropTypes.bool
};

ValidationField.defaultProps = {
  show: false,
  validationInfo: {}
};
