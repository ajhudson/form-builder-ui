// @ts-nocheck
import FormFieldConfigBuilder from './form-field-config-builder';
import ValidationTypes from './validation-types';
import FormFieldTypes from './form-field-types';

describe('form field factory tests', () => {
  let builder;

  beforeEach(() => {
    builder = new FormFieldConfigBuilder();
  });

  it('should create a text field with no validation rules', () => {
    const field = builder
      .createFormField(1, 'firstName', 'First Name', FormFieldTypes.TEXT)
      .build();

    const expectedField = {
      fieldId: 1,
      fieldName: 'firstName',
      displayName: 'First Name',
      fieldType: 'text',
      options: null,
      validationRules: {}
    };

    expect(field).toMatchObject(expectedField);
  });

  it('should create a text field with a mandatory rule', () => {
    const field = builder
      .createFormField(1, 'firstName', 'First Name', FormFieldTypes.TEXT)
      .addValidationToFormField(ValidationTypes.MANDATORY)
      .build();

    const expectedField = {
      fieldId: 1,
      fieldName: 'firstName',
      displayName: 'First Name',
      fieldType: 'text',
      options: null,
      validationRules: {
        mandatory: { enabled: true, errorMessage: 'First Name is required.' }
      }
    };

    expect(field).toMatchObject(expectedField);
  });
});
