// @ts-nocheck
import FormFieldConfigBuilder from './form-field-config-builder';
import { FormFieldValidator } from './form-field-validator';
import FormFieldTypes from './form-field-types';
import ValidationTypes from './validation-types';

describe('Form field tests', () => {
  let builder;

  beforeEach(() => {
    builder = new FormFieldConfigBuilder();
  });

  it('should fail mandatory check if the form field is empty and is configured to be mandatory', () => {
    const fieldConfig = builder
      .createFormField(1, 'firstName', 'First Name', FormFieldTypes.TEXT)
      .addValidationToFormField(ValidationTypes.MANDATORY)
      .build();

    const fieldValidator = new FormFieldValidator();
    const result = fieldValidator.validateFormField(fieldConfig, '');
    const expectedResult = [
      {
        validationType: ValidationTypes.MANDATORY,
        required: true,
        hasPassed: false,
        errorMessage: 'First Name is required.'
      }
    ];

    expect(result).toMatchObject(expectedResult);
  });

  it('should pass mandatory check if the form field is empty and is configured to be optional', () => {
    const fieldConfig = builder
      .createFormField(1, 'firstName', 'First Name', FormFieldTypes.TEXT)
      .build();

    const fieldValidator = new FormFieldValidator();
    const result = fieldValidator.validateFormField(fieldConfig, '');

    const expectedResult = [
      {
        validationType: ValidationTypes.MANDATORY,
        required: false,
        hasPassed: true,
        errorMessage: null
      }
    ];

    expect(result).toMatchObject(expectedResult);
  });
});
