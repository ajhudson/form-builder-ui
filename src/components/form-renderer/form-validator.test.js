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
    formValidator.validate(formConfig, formValues);

    expect(formValidator.isFormValid()).toBeFalsy();
    expect(formValidator.isFieldValid('firstName')).toBeFalsy();

    expect(formValidator.getErrorMessagesForField('firstName')).toMatchObject([
      {
        validationType: ValidationTypes.MANDATORY,
        errorMessage: 'First Name is required.'
      }
    ]);
  });
});
