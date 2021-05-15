// @ts-nocheck
import FormFieldConfigBuilder, {
  FormFieldTypes,
  ValidationTypes
} from './form-field-config-builder';

describe('form field factory tests', () => {
  let builder;

  beforeEach(() => {
    builder = new FormFieldConfigBuilder();
  });

  it('should create a text field with no validation rules', () => {
    const field = builder
      .createFormField(1, 'firstName', 'First Name', FormFieldTypes.TEXT)
      .getFormFieldConfig();

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
      .getFormFieldConfig();

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
