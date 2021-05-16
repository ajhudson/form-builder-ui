// @ts-nocheck
import FormConfigBuilder from './form-config-builder';
import FormFieldConfigBuilder from './form-field-config-builder';
import ValidationTypes from './validation-types';
import FormFieldTypes from './form-field-types';

describe('Tests to do with building a form and producing a config object', () => {
  it('should return a form config object correctly', () => {
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

    const expectedFormConfig = {
      id: 1,
      formName: 'Test Form',
      fields: [
        {
          fieldId: 101,
          fieldName: 'firstName',
          fieldType: 'text',
          options: null,
          validationRules: {
            mandatory: { enabled: true, errorMessage: 'First Name is required.' }
          }
        }
      ]
    };

    expect(formConfig).toMatchObject(expectedFormConfig);
  });
});
