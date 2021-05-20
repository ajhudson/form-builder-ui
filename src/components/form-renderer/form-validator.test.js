// @ts-nocheck
import FormConfigBuilder from './form-config-builder';
import FormFieldConfigBuilder from './form-field-config-builder';
import FormValidator from './form-validator';
import ValidationTypes from './validation-types';
import FormFieldTypes from './form-field-types';

describe('form validator tests', () => {
  it('should determine if a mandatory form field which is empty is not valid', () => {
    const fieldBuilder = new FormFieldConfigBuilder();
    const firstNameField = fieldBuilder
      .createFormField(101, 'firstName', 'First Name', FormFieldTypes.TEXT)
      .addValidationToFormField(ValidationTypes.MANDATORY)
      .build();

    const formBuilder = new FormConfigBuilder();
    const formConfig = formBuilder
      .createForm(1, 'Test Form')
      .addField(firstNameField)
      .build();

    const formValues = {
      firstName: ' '
    };

    const formValidator = new FormValidator();
    const validationResult = formValidator.validate(formConfig, formValues);

    expect(validationResult.isValid).toBeFalsy();

    const firstNameValidationResult = validationResult.fields.firstName.find(
      (v) => v.validationType === ValidationTypes.MANDATORY
    );

    expect(firstNameValidationResult.hasPassed).toBeFalsy();
    expect(firstNameValidationResult.errorMessage).toContain(
      'First Name is required.'
    );
  });
});
