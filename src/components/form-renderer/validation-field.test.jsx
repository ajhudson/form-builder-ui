import React from 'react';
import { render, screen } from '@testing-library/react';
import ValidationField from './validation-field';
import ValidationTypes from './validation-types';

describe('Validation field', () => {
  it('should not render anything is show prop is false', () => {
    const validationInfo = {
      validationType: ValidationTypes.MANDATORY,
      fieldName: 'firstName',
      displayName: 'First Name'
    };

    const { container } = render(
      <ValidationField validationInfo={validationInfo} show={false} />
    );

    expect(container.firstChild).not.toBeInTheDocument();
  });

  it('should render a mandatory field error', () => {
    const validationInfo = {
      validationType: ValidationTypes.MANDATORY,
      fieldName: 'firstName',
      displayName: 'First Name'
    };

    render(<ValidationField validationInfo={validationInfo} show />);

    screen.getByText('First Name is a mandatory field');
  });
});
